async function renderPokemons() {
    const pokemonsContainer = document.querySelector(".pokeList");

    // Display loading SVG initially
    pokemonsContainer.innerHTML = loadingSVG;

    const pokemons = await getPokemonList()
    const listOfPokemonsWithSprites = await getListOfPokemonsWithSprites(pokemons)

    pokemonsContainer.innerHTML = "";

    console.log(listOfPokemonsWithSprites)
    listOfPokemonsWithSprites.forEach(function (pokemon) {
        let li = document.createElement("li")

        if(pokemon.sprites && pokemon.sprites.front_default){
        li.innerHTML = `
        <a class="pokeList__pokemon" href="pokemonDetail.html?name=${pokemon.name}"><img class="pokeList__img" src="${pokemon.sprites.front_default}" >${pokemon.name}</a>
        `
         } else {
                li.innerHTML = `
                    <li>
                        ${loadingSVG}
                    </li>`;
            }

            pokemonsContainer.append(li);

        document.querySelector(".pokeList").append(li)

        
    })
}
 
renderPokemons()


https://mkhan11417.medium.com/pokemon-javascript-website-challenge-fceea183d8a8
