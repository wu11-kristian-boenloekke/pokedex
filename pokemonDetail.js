const URL = new URLSearchParams(window.location.search);
const speechSynthesis = window.speechSynthesis;


async function fetchPokemonByName() {
    try {

        await new Promise(resolve => setTimeout(resolve, 700));

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + URL.get("name"));
        if (response.status === 200) {
        const data = await response.json();
        console.log(data);

        const heading = document.querySelector(".detailHeading")
        heading.innerHTML = `<h1 class="detailUppercase detailH1">${data.name} </h1>
        <h2 class="detailUppercase">no. ${data.id}</h2>`

        const imageContainer = document.querySelector(".imageContainer")
        imageContainer.innerHTML = ` 
            <img class="pokemonImage frontImage" id="shake" src="${data.sprites.front_default}">
            <img class="pokemonImage backImage" src="${data.sprites.back_default}">
            
            <ul class="ul__type">
            ${data.types.map(elem => `<a href="pokemonType.html?type=${elem.type.name}" class="${elem.type.name.toLowerCase()} li__type shimmer"  >${elem.type.name}</a>`).join("")}
            </ul>
         `;
         
         const pokemonStats = document.querySelector(".pokemonStats");
         const statsList = data.stats.map(stat =>  `
             <li class="statName">${stat.stat.name}</li>
             <li class="statValue">
                 <div class="statBar" style="width: ${stat.base_stat}px;"></div> 
             </li>`
         ).join("");
         
     
         pokemonStats.innerHTML = `</select><ul class="ul__stats">${statsList}</ul>`;

         const pokemonDescription2 = document.querySelector(".pokemonDescription2")
         pokemonDescription2.innerHTML = `<div class="abilities"> Abilities: ${data.abilities.map(elem => `<li class="abilities__li">${elem.ability.name},</li>`).join("")}</div>
         <div> Weight: ${data.weight}</div> <div> Height: ${data.height}</div>
         <button class="playCry">Cry: <i class="fas fa-volume-up" aria-hidden="true"></i></button>
        <audio class="cry" src=""></audio>
         <button class="switchEntryButton">&lt2/2</button>`;


        const pokemonSpecs = document.querySelector(".pokemonSpecs");
        pokemonSpecs.innerHTML = `
            <div class="specsContainer">
            <h2 class="specsHeading" >Type</h2> 
            <ul class="ul__container">
            ${data.types.map(elem => `<a href="pokemonType.html?type=${elem.type.name}" class="${elem.type.name.toLowerCase()} li__type"  >${elem.type.name}</a>`).join("")}
            </ul>
            </div>
        

            
            <h2 class="specsHeading">Moves</h2> 
            <ul class="movesContainer">
            ${data.moves.map(elem => `<li >${elem.move.name}</li>`).join("")}
            </ul>
              

        `;

        const audioElement = document.querySelector(".cry");
        const playCryButton = document.querySelector(".playCry");

        audioElement.src = data.cries.latest;
        audioElement.type = "audio/ogg";
        
        playCryButton.addEventListener("click", () => {
                audioElement.play();
            
        });

       document.querySelector(".playCry").addEventListener("click", startAnimation)

       let playCry = true

        function startAnimation(){
            const shake = document.querySelector("#shake")

            if (playCry) {
            shake.style.animation = "shake 0.5s"
            } else {
                shake.style.animation = "0s"
            }

            playCry = !playCry
            
        }

        

        speakPokemonDetails(data);
       

        document.querySelector('.switchImageButton').addEventListener('click', handleSwitchButton);
      document.querySelector(".switchEntryButton").addEventListener("click", handleEntryButton);
       

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

fetchPokemonByName()


let switchImageButton = true;

function handleSwitchButton() {
    const frontImage = document.querySelector(".frontImage")
    const backImage = document.querySelector(".backImage")

    if (switchImageButton) {
        frontImage.style.display = 'none';
        backImage.style.display = 'block';
    } else {
        frontImage.style.display = 'block';
        backImage.style.display = 'none';
    }

    
    switchImageButton = !switchImageButton;
}

let switchEntryButton = true;

function handleEntryButton() {
    const firstEntry = document.querySelector(".pokemonDescription")
    const secondEntry = document.querySelector(".pokemonDescription2")

    if (switchEntryButton) {
        firstEntry.style.display = 'none'
        secondEntry.style.display = 'block'
    } else {
        firstEntry.style.display = 'block'
        secondEntry.style.display = 'none'
    }

    switchEntryButton = !switchEntryButton
}


let currentUtterance = null;

function speakPokemonDetails(data) {

    
    const pokemonName = data.name;
    const abilities = data.abilities.map(ability => ability.ability.name).join(', ');

    // Clear the existing speech synthesis queue
    if (currentUtterance) {
        speechSynthesis.cancel();
    }

    // Create a new speech synthesis utterance for the first part
    const firstUtterance = new SpeechSynthesisUtterance(`${pokemonName}`);
    firstUtterance.pitch = 0.5; 

    speechSynthesis.speak(firstUtterance);

    // Save the current utterance for later reference
    currentUtterance = firstUtterance;

    setTimeout(() => {
        // Check if the current utterance is still the first one
        if (currentUtterance === firstUtterance) {

            

            const secondUtterance = new SpeechSynthesisUtterance(`${abilities}`);
            secondUtterance.pitch = 0.5;


            speechSynthesis.speak(secondUtterance);

            // Clear the current utterance after the second part is read
            secondUtterance.onend = () => {
                currentUtterance = null;
            };
        }
    }, 2500);
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
        
            await fetchPokemonSpecies(newPokemonId);
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateURLAndFetch(newValue) {
    URL.set('name', newValue.toString());
    window.history.pushState({}, '', `?name=${newValue}`);
    fetchPokemonByName();
    fetchPokemonSpecies();


}

fetchPokemonByName();



async function fetchPokemonSpecies() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/` + URL.get("name"));
    const data = await response.json()

    const filteredFlavorTextEntries = data.flavor_text_entries.filter(
        (element) => element.language.name === "en"
    )

    const flavorTextEntry = 
        filteredFlavorTextEntries.length > 0 ? filteredFlavorTextEntries[0]: {}
        console.log(flavorTextEntry);
    
        const pokemonDescription = document.querySelector(".pokemonDescription");
        
      
        pokemonDescription.innerHTML = `<div class="entry1">${flavorTextEntry.flavor_text}</div>
        <button class="switchEntryButton2">1/2&gt</button>`;
        
        
        document.querySelector(".switchEntryButton2").addEventListener("click", handleEntryButton)
       
    
}

fetchPokemonSpecies()































