console.log("script js works")

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
    displayPokemon(pokemon);
});

const displayPokemon = pokemon => {
    console.log(pokemon);
    const pokemonHTMLstring = pokemon.map(
        pokeman => `<h2 class="card-number">${pokeman.id}</h2> <li class="card"> <img class="card-image" src="${pokeman.image}"/> <h3 class="card-title">${pokeman.name.toUpperCase()}</h3>`
        ).join("");
        pokedex.innerHTML = pokemonHTMLstring;
};