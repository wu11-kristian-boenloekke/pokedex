const URL = new URLSearchParams(window.location.search)

//console.log(URL.get("name"))



fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`)
    .then(function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            document.body.innerText += "Ups, noget gik galt. Prøv igen senere"
        }
    })

    .then(function (data) {
        console.log(data)
        const DIV = document.querySelector(".pokemon")
        DIV.innerHTML = "" `

        <div class="heading">

            <h1>${data.name}</h1>
            <h2> no. ${data.id}</h2>
            
        </div>

        <div class="imageContainer">

            <img class="pokemonImage" src="${data.sprites.front_default}"></img>
        
            <button class="switchButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M320,146s24.36-12-64-12A160,160,0,1,0,416,294" style="fill:none;stroke:#000;stroke-linecap:square;stroke-miterlimit:10;stroke-width:52px"/><polyline points="256 58 336 138 256 218" style="fill:none;stroke:#000;stroke-linecap:square;stroke-miterlimit:10;stroke-width:32px"/></svg>
            </button>
        
        </div>
    
        <div class="pokemonProperties">

            <p>Order: <span class=" screen2">${data.order} </span></p>
            <p>Height: <span class="screen2">${data.height} </span></p>
            <p>Weight: <span class="screen2">${data.weight} </span></p>

        </div>

       

        <section class="pokemonInfo screen">

            <h3>${data.name}</h3>
            
            
            <h4>Ability</h4>
            <ul class="ul__ability">
             ${data.abilities.map(elem => `<li class="${elem.ability.name.toLowerCase()} screen">${elem.ability.name}</li>`).join("")}</ul>
            
             <h4>Type</h4> 
            <ul class="ul__ability">
            ${data.types.map(elem => `<li class="${elem.type.name.toLowerCase()} li__type">${elem.type.name}</li>`).join("")}
            </ul>
            
            <h4>Moves</h4>
            <ul class="scroll">${data.moves.map(elem => `<li>${elem.move.name}</li>`).join("")}</ul>

        </section>

        

        <div class="listContainer">

            <div class="inputContainer">
                <label>Choose Your Pokemon</label>
                <input class="searchField" type="search" placeholder="write name or letter">
                <button class="searchField">search</button>
            </div>

            <h1 class="listHeading">pokedex</h1>
            <ul class="results"></ul>
            <a href="" class="prevPage">Forrige</a> | <a href="" class="nextPage">Næste</a>
                    
        
        </div>

        `
    })

/*const btn = document.querySelector('test__test')
    const image = document.querySelector('test__image')

    btn.addEventListener('click', () => {
        if (!image.src.includes('back')) {
            console.log('front');
        }
    })
    */

/*
const URL = new URLSearchParams(window.location.search);

async function fetchData() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`);
        const data = await response.json();
        
        // Assuming any response status other than 200 should be treated as an error
        if (!response.ok) {
            throw new Error("Ups, noget gik galt. Prøv igen senere");
        }

        console.log(data);

        const DIV = document.querySelector(".pokemon");
        DIV.innerHTML = "";
    } catch (error) {
        console.error("Error fetching data:", error);
        document.body.innerText += error.message;
    }
}

// Call the asynchronous function
fetchData();

*/

/*
const URL = new URLSearchParams(window.location.search);

async function fetchData() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`);
        
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);

            const DIV = document.querySelector(".pokemon");
            DIV.innerHTML = "";
        } else {
            document.body.innerText += "Ups, noget gik galt. Prøv igen senere";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the asynchronous function
fetchData();

*/


https://mkhan11417.medium.com/pokemon-javascript-website-challenge-fceea183d8a8
