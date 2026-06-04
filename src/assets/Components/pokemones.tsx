import { useState,useEffect } from "react";
import type {   pokemon,  pokemonsdetalle } from "../../api/pokeinfo/Models";
import {  getpokemon,getpokemondetalle } from "../../api/pokeinfo";

function Pokemones(){
  const [pokemons, setPokemons] = useState<pokemonsdetalle[]>([]);

  useEffect(() => {
    getpokemon().then(async (lista: pokemon[]) => {
      const detalles = await Promise.all(
        lista.map(pokemon => getpokemondetalle(pokemon.url))
      );

      setPokemons(detalles);
     
    });
  }, []);
   console.log(pokemons);
 return <div>
    <h1> Mis Pokemones</h1>
    <ul>
        {pokemons.map (pokemon  => <li key={pokemon.id}>
             
            <h2>{pokemon.name}</h2>
            <img src ={pokemon.sprites.front_default} alt="" />
            
            

        </li>)}
    </ul>
 </div> 

}
export default Pokemones