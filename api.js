//brug til alle fetches

export async function getPokemonList() {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
    const data = await response.json() //returnerer json objekt, med resolved liste af pokemoner
    
    return data
}

export async function getPokemonByName(name) { 
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
    const data = await response.json()
    return data
} //istedet for at skrive funktionen to steder kan vi bruge export og import


export async function getPokemonsByType(type) {
    const response = await fetch("https://pokeapi.co/api/v2/type")
    const data = await response.json()
    return data

    
}