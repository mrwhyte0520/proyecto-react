export function getpokemon(url = 'https://pokeapi.co/api/v2/pokemon/'){
     return fetch(url)
    .then(response => response.json());
    
}

export function getpokemondetalle(url:string){
    return fetch(url)
    .then(response => response.json())
    
   
} 

export function busquedapokemon(nombre: string) {
    return fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombre}`
    )
    .then(response => response.json());
}