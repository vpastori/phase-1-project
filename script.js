console.log("script js works")

const promises = [];
for (let i = 1; i <= 151; i++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then(response => response.json()));
}
Promise.all(promises).then(results => {
    console.log(results);
});
