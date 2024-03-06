import { getPokemonByName} from "./api.js"  //hvis vi skal bruge import skal vi tilføje type="module" i html script link
//import { getPokemonList } from "./api.js"

function inputToLowerCase(input){
    input.value = input.value.toLowerCase()
}


const params = new URLSearchParams(location.search)

const offset = parseInt(params.get("offset")) || 0;
const nextPage = document.querySelector(".nextPage");
const prevPage = document.querySelector(".prevPage");

nextPage.href = `/?offset=${offset + 20}`;
prevPage.href = `/?offset=${offset <= 0 ? 0 : offset - 20}`;

const loadingSVG = `<svg width="27" height="27" viewBox="0 0 512 512" fill="url(#pcn-ds)" stroke="#000"
stroke-width="3">
<defs>
    <linearGradient id="pcn-ds" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        <stop offset="45%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        <stop offset="45%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
        <stop offset="55%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
        <stop offset="55%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:1" />
    </linearGradient>

</defs>
<circle cx="256" cy="256" r="62" fill="white" />
<path
    d="M414.39,97.61A224,224,0,1,0,97.61,414.39,224,224,0,1,0,414.39,97.61ZM256,336a80,80,0,1,1,80-80A80.09,80.09,0,0,1,256,336Z" />
</svg>`;

async function getPokemonList() {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
    const data = await response.json() //returnerer json objekt, med resolved liste af pokemoner
    
    return data
} 

 
async function renderPokemons() {
    

    const pokemonsContainer = document.querySelector(".pokeList");

    // Display loading SVG initially
    pokemonsContainer.innerHTML = "";

    for (let i = 0; i < 20; i++) {
        let li = document.createElement("li");
        li.innerHTML = `
            <li class="li__loading">
                <svg class="pokeballSVG__spin"
                ${loadingSVG}
                </svg>
               
            </li>`;
        pokemonsContainer.append(li);
    }

    setTimeout(async () => {
        const pokemons = await getPokemonList();
        const listOfPokemonsWithSprites = await getListOfPokemonsWithSprites(pokemons);

        // Replace loading SVG with actual Pokémon data
        for (let i = 0; i < listOfPokemonsWithSprites.length; i++) {
            const li = pokemonsContainer.children[i];
            li.innerHTML = `
                <a class="pokeList__pokemon" href="pokemonDetail.html?name=${listOfPokemonsWithSprites[i].name}">
                    <img class="pokeList__img" src="${listOfPokemonsWithSprites[i].sprites.front_default || ''}" alt="${listOfPokemonsWithSprites[i].name}">
                    ${listOfPokemonsWithSprites[i].name}
                </a>`;
        }

    }, 3000);
    
}

renderPokemons();
 
 
// Adds images
async function getListOfPokemonsWithSprites(pokemons) {
    return await Promise.all( //promose.all er når vi har et array af promises hvor vi skal håndterer alle på en gang
        pokemons.results.map( async function (pokemon) { //med map får jeg en ny liste over detailer om hver pokemon - await getPokemonByName
        const data = await getPokemonByName(pokemon.name)
        return data
    }))

    
}