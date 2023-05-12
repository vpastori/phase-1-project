console.log("script js works")
const cardContainer = document.getElementById("card-container");
let pokemonData = []


//          FETCH


const fetchPokemonData = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => response.json()));
    }
    return Promise.all(promises).then(results => {
        pokemonData = results.map(data => ({
            name: data.name,
            id: data.id,
            image: data.sprites["front_default"],
            shinyImage: data.sprites["front_shiny"],
            type: data.types.map(type => type.type.name).join(", "),
        }));
        return pokemonData;
    });
}

//      RENDER CARDS

const renderCards = (dataArray) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    cardContainer.style.textAlign = "center";
    dataArray.forEach((cardInfo) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("pokemon");
        imgContainer.style.padding = "0";
        imgContainer.style.border = "7.5px solid #3c5aa6";
        const img = document.createElement("img");
        const name = document.createElement("p");
        const idNum = document.createElement("p");
        const pokeType = document.createElement("p")

        name.textContent = `Name: ${cardInfo.name.toUpperCase()}`
        idNum.textContent = `#${cardInfo.id}`
        pokeType.textContent = `Type: ${cardInfo.type.toUpperCase()}`
        name.style.fontWeight = "bold";
        name.style.fontSize = "1.5em";
        idNum.style.fontWeight = "bold";
        idNum.style.fontSize = "1.5em";
        pokeType.style.fontWeight = "bold";
        imgContainer.append(idNum, img, name, pokeType)

        img.src = cardInfo.image;

        cardContainer.appendChild(imgContainer);
    });
};

//          SEARCH BAR 

const elementById = (id) => {
    return document.getElementById(id)
}

const filterCardsBySearch = (searchTerm) => {
    const filteredCards = pokemonData.filter(card => {
        const nameMatch = card.name.toLowerCase().includes(searchTerm);
        const idMatch = card.id.toString().includes(searchTerm);
        return nameMatch || idMatch;
    });
    renderCards(filteredCards)
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target["search-bar"].value.toLowerCase();
    filterCardsBySearch(searchTerm);
    event.target.reset();
}

const searchForm = document.getElementById("searchBarForm");
searchForm.addEventListener("submit", handleFormSubmit);

//          NAV LINKS 


const addEventListenerToNavLinks = () => {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const category = link.dataset.category;
            const filteredData = pokemonData.filter(pokemon => pokemon.type.includes(category));
            renderCards(filteredData);
        })
    })
}

//          CALLED FUNCTIONS

fetchPokemonData().then(data => {
    renderCards(data);
    addEventListenerToNavLinks();
})
    .catch(error => {
        console.error(error);
    });
