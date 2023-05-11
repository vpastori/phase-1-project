console.log("script js works")

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
    console.log(pokemon)
};