export function getpokemon(){
    return fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(data =>  data.results);
}

export function getpokemondetalle(url:string){
    return fetch(url)
    .then(response => response.json())
   
} 