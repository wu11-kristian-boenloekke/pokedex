const URL = new URLSearchParams(window.location.search);



async function fetchPokemonByName() {
    try {

        await new Promise(resolve => setTimeout(resolve, 700));

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + URL.get("name"));
        if (response.status === 200) {
        const data = await response.json();
        console.log(data);

        const heading = document.querySelector(".detailHeading")
        heading.innerHTML = `<h1 class="detailUppercase">${data.name} </h1>
        <h2 class="detailUppercase">no. ${data.id}</h2>`

        const imageContainer = document.querySelector(".imageContainer")
        imageContainer.innerHTML = ` 
            <img class="pokemonImage frontImage" src="${data.sprites.front_default}">
            <img class="pokemonImage backImage" src="${data.sprites.back_default}">
         `;
         

        const div = document.querySelector(".pokemon");
        div.innerHTML = `
      
        <h2 class="specsHeading" >Type</h2> 
            <ul class="ul__container">
            ${data.types.map(elem => `<a href="pokemonType.html?type=${elem.type.name}" class="${elem.type.name.toLowerCase()} li__type"  >${elem.type.name}</a>`).join("")}
            </ul>
        
            <h2 class="specsHeading">Ability</h2> 
            <ul class="ul__container">
            ${data.abilities.map(elem => `<li class="li__ability" >${elem.ability.name}</li>`).join("")}
            </ul>

            <h2 class="specsHeading">Moves</h2> 
            <ul class="scroll">
            ${data.moves.map(elem => `<li >${elem.move.name}</li>`).join("")}
            </ul>

        `;

       

       const switchButton = document.querySelector('.switchButton').addEventListener('click', handleSwitchButton);
       

    } else {
        // Display error message when response status is not 200
        console.error(`Error fetching data. Status Code: ${response.status}`);
        const errorMessage = document.createElement('p');
        errorMessage.innerText = '...not found. Try again';
        document.querySelector('.detailHeading .spanHeading').textContent = ''; // Clear previous content
        document.querySelector('.detailHeading .spanHeading').appendChild(errorMessage);
    }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

let isFrontImage = true;

function handleSwitchButton() {
    const frontImage = document.querySelector(".frontImage");
    const backImage = document.querySelector(".backImage");

    if (isFrontImage) {
        frontImage.style.display = 'none';
        backImage.style.display = 'block';
    } else {
        frontImage.style.display = 'block';
        backImage.style.display = 'none';
    }

    
    isFrontImage = !isFrontImage;
}

const nextPokemonButton = document.querySelector('.nextPokemon');
const previousPokemonButton = document.querySelector('.previousPokemon');

nextPokemonButton.addEventListener('click', () => {
    updatePokemonIndex(1);
});

previousPokemonButton.addEventListener('click', () => {
    updatePokemonIndex(-1);
});

function updatePokemonIndex(increment) {
    const currentPokemonValue = URL.get('name');

    if (currentPokemonValue) {
        const currentPokemonIndex = parseInt(currentPokemonValue, 10);

        if (!isNaN(currentPokemonIndex)) {
            // If current value is a number, update by ID
            const newPokemonIndex = currentPokemonIndex + increment;
            updateURLAndFetch(newPokemonIndex);
        } else {
            // If current value is a name, fetch the next or previous Pokemon based on the API index
            fetchNextOrPreviousPokemon(currentPokemonValue, increment);
        }
    }
}

async function fetchNextOrPreviousPokemon(currentPokemonName, increment) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemonName}`);
        
            const data = await response.json();
            const newPokemonId = data.id + increment;
            updateURLAndFetch(newPokemonId);
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateURLAndFetch(newValue) {
    URL.set('name', newValue.toString());
    window.history.pushState({}, '', `?name=${newValue}`);
    fetchPokemonByName();
}


fetchPokemonByName();




/*async function handleTypeClick(event) {
    const selectedType = event.target.dataset.type;
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
        const typeData = await response.json();
        const pokemonList = typeData.pokemon;

        // Log the list of Pokemon for demonstration
        console.log(`Pokemon of type ${selectedType}:`, pokemonList);
        
        // Handle the fetched Pokemon data as needed (e.g., display them on the page)
        // ...
    } catch (error) {
        console.error(`Error fetching Pokemon of type ${selectedType}:`, error);
    }
}*/






























