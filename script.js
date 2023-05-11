console.log("script js works")

// event listeners

// const navLinks = document.querySelectorAll(".nav-link");
// navLinks.forEach((link) => link.addEventListener("click", handleNavClick));

// const searchForm = idElement("searchBarForm")
// searchForm.addEventListener("submit", handleFormSubmit)

const pokedex = document.getElementById('pokedex');

const promises = [];
for (let i = 1; i <= 151; i++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => response.json()));
}
Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        shinyImage: data.sprites["front_shiny"],
        type: data.types.map(type => type.type.name).join(", "),
    }));
    renderCards(pokemon);
});

const renderCards = (dataArray) => {
    const cardContainer = document.getElementById("card-container");
    dataArray.forEach((cardInfo) => {
        const img = document.createElement("img");
        img.src = cardInfo.image;
        cardContainer.appendChild(img);
    });
};


