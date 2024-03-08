

document.addEventListener('DOMContentLoaded', async () => {
    try {

        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');

        
        document.querySelector('.typeName').innerText = type.toUpperCase();

        
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();

        const pokemonsOfType = document.querySelector('.pokemonsOfType');


        
        data.pokemon.forEach(pokemon => {
            const typePokemon = document.createElement('li');
            typePokemon.innerHTML = `
                <a class="pokeType__pokemon" href="pokemonDetail.html?name=${pokemon.pokemon.name}">${pokemon.pokemon.name}</a>
            `;
            pokemonsOfType.appendChild(typePokemon);
        });

        async function getPokemonTypes(type) {
            const response = await fetch("https://pokeapi.co/api/v2/type")
            const data = await response.json()
            return data
        
            
        }

        async function renderTypes() {
    
            const typesData = await getPokemonTypes()
            const listOfTypes = typesData.results; 
    
            listOfTypes.forEach(function (data) {
                let type = document.createElement("li")
                type.className = data.name.toLowerCase();
                type.innerHTML = `<a href="pokemonType.html?type=${data.name}" class="li__type2" >
                ${data.name}
                </a>` 
    
                document.querySelector(".types").append(type);
            });
    
            console.log(listOfTypes);
        
    }
    
    renderTypes();

        

    } catch (error) {
        console.error(`Error fetching Pokemon of type ${type}:`, error);
    }
});