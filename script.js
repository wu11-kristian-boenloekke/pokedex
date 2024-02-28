const param = new URLSearchParams(location.search)
const search = param.get("search")


async function getPokeData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon")  //await tager automatisk en resolve funktion
    const data = await response.json()
    console.log(data)
    return data

}


getPokeData()

async function getPokemonList() {
    const pokemon = await getPokeData()
    console.log(pokemon)
    const list = document.querySelector(".pokeList")
    pokemon.results.forEach(result => {
        let li = document.createElement("li")
        li.innerHTML = `<a href="#">${result.name}</a>`; 
        
        list.append(li)

    });
}

getPokemonList()

/*

let pokemons

async function getPokemonByName (name) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
    const data = await response.json()
    return data
}


let listOfPokemonsWithSprites

async function getListOfPokemonsWithSprites() {
    listOfPokemonsWithSprites = pokemons.results.map( function (name){  //results er et array navn i API'et
        return await getPokemonByName(name)
    }) 
}

*/