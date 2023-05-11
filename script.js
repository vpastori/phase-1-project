console.log("script js works")
const cardContainer = document.getElementById("card-container");

// event listeners
const addHoverEffect = (e) => {
    e.target.classList.add("saturate-img")
    e.target.style.border = "2px solid var(--dark-grey)"
}
const removeHoverEffect = (e) => {
    e.target.classList.remove("saturate-img")
    e.target.style.border = "none"
}


// const pokedex = document.getElementById('pokedex');
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
    dataArray.forEach((cardInfo) => {
        const imgContainer = document.createElement("div");
        imgContainer.style.padding = "0";
        imgContainer.style.border = "none"
        const img = document.createElement("img");
        const name = document.createElement("p");
        const idNum = document.createElement("p");
        const pokeType = document.createElement("p")

        name.textContent = cardInfo.name.toUpperCase()
        idNum.textContent = cardInfo.id
        pokeType.textContent = cardInfo.type.toUpperCase()
        imgContainer.append(idNum, img, name, pokeType)

        img.src = cardInfo.image;

        cardContainer.appendChild(imgContainer);
        // img.addEventListener("click", () => { });
        img.addEventListener("mouseenter", addHoverEffect)
        img.addEventListener("mouseleave", removeHoverEffect)
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

const generateCardHtml = (pokemon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = pokemon.image;
    img.alt = pokemon.name;

    const body = document.createElement("div");
    body.classList.add("card-body");

    const name = document.createElement("h5");
    name.classList.add("card-title");
    name.textContent = pokemon.name.toUpperCase();

    const id = document.createElement("p");
    id.textContent = `ID: ${pokemon.id}`;

    const type = document.createElement("p");
    type.textContent = `Type: ${pokemon.type}`;

    body.append(name, id, type);

    const button = document.createElement("a");
    button.href = "#";
    button.classList.add("btn", "btn-primary");
    button.textContent = "Go somewhere";

    card.append(img, body, button);

    return card;
};

pokemonData.forEach(pokemon => {
    const card = generateCardHtml(pokemon);
    cardContainer.appendChild(card);
});



//          CALLED FUNCTIONS

fetchPokemonData().then(data => {
    renderCards(data);
    addEventListenerToNavLinks();
})
    .catch(error => {
        console.error(error);
    });
    console.log(cardContainer)