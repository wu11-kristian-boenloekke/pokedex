import {getPokemonByName} from "./api.js"  //hvis vi skal bruge import skal vi tilføje type="module" i html script link
import { getPokemonList } from "./api.js"



const params = new URLSearchParams(window.location.search)
const searchParam = params.get("name")

 
async function renderPokemons() {

    const pokemons = await getPokemonList()
    const listOfPokemonsWithSprites = await getListOfPokemonsWithSprites(pokemons)
    console.log(listOfPokemonsWithSprites)
    listOfPokemonsWithSprites.forEach(function (pokemon) {
        let li = document.createElement("li")
        li.innerHTML = `
        <a class="pokeList__pokemon" href="pokemonDetail.html?name=${pokemon.name}"><img class="pokeList__img" src="${pokemon.sprites.front_default}" >${pokemon.name}</a>
        `
        document.querySelector(".pokeList").append(li)

        
    })
}
 
renderPokemons()
 
 
// Adds images
async function getListOfPokemonsWithSprites(pokemons) {
    return await Promise.all( //promose.all er når vi har et array af promises hvor vi skal håndterer alle på en gang
        pokemons.results.map( async function (pokemon) { //med map får jeg en ny liste over detailer om hver pokemon - await getPokemonByName
        const data = await getPokemonByName(pokemon.name)
        return data
    }))

    
}