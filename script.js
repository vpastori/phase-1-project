console.log("script js works")

// event listeners


// const searchForm = idElement("searchBarForm")
// searchForm.addEventListener("submit", handleFormSubmit)

const pokedex = document.getElementById('pokedex');
let pokemonData = []

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
const renderCards = (dataArray) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    dataArray.forEach((cardInfo) => {
        const imgContainer = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("p");
        const idNum = document.createElement("p");

        name.textContent = cardInfo.name.toUpperCase()
        idNum.textContent = cardInfo.id
        imgContainer.append(idNum, img, name)

        img.src = cardInfo.image;

        cardContainer.appendChild(imgContainer);
        // img.addEventListener("click", () => { });
        // img.addEventListener("mouseenter", addHoverEffect)
        // img.addEventListener("mouseleave", removeHoverEffect)
    });
};

const addEventListenerToNavLinks = () => {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            console.log("clicked link");
            const category = link.dataset.category;
            console.log("catagory:", category);
            const filteredData = pokemonData.filter(pokemon => pokemon.type.includes(category));
            console.log("filteredData:", filteredData);
            renderCards(filteredData);
        })
    })

}
fetchPokemonData().then(data => {
    renderCards(data);
    addEventListenerToNavLinks();
})
.catch(error => {
    console.error(error);
});