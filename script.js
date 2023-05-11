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
        const imgContainer = document.createElement("div");
        const img = document.createElement("img");
        const name = document.createElement("p");
        const idNum = document.createElement("p");

        name.textContent = cardInfo.name.toUpperCase()
        idNum.textContent = cardInfo.id
        console.log(name)
        imgContainer.append(idNum, img, name)

        img.src = cardInfo.image;

        cardContainer.appendChild(imgContainer);
        // img.addEventListener("click", () => { });
        // img.addEventListener("mouseenter", addHoverEffect)
        // img.addEventListener("mouseleave", removeHoverEffect)
    });
};


