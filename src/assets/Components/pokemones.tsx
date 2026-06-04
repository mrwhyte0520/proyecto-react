import { useState,useEffect } from "react";
import type {   pokemon,  pokemonsdetalle } from "../../api/pokeinfo/Models";
import {  getpokemon,getpokemondetalle } from "../../api/pokeinfo";
import {Card, Pagination, Col, Row} from 'antd';


 
function Pokemones(){
  const [pokemons, setPokemons] = useState<pokemonsdetalle[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [previousUrl, setPreviousUrl] = useState<string>("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    getpokemon().then(data => {
        setNextUrl(data.next);
        setPreviousUrl(data.previous);
        setCount(data.count);

        Promise.all(
            data.results.map((pokemon: pokemon) =>
                getpokemondetalle(pokemon.url)
            )
        ).then(detalles => {
            setPokemons(detalles);
        });
    });
}, []);
   console.log(pokemons);
 return <div>
    <h1> Mis Pokemones</h1>

    <form>  
        <input type="text" placeholder="Buscar pokemon" />
        <button type="submit">Buscar</button>
    </form>
    <button className="BotonAtras"  disabled={!previousUrl} onClick={() => {
        getpokemon(previousUrl).then(data => {
            setNextUrl(data.next);
            setPreviousUrl(data.previous);
           

            Promise.all(
                data.results.map((pokemon: pokemon) =>
                    getpokemondetalle(pokemon.url)
                )
            ).then(detalles => {
                setPokemons(detalles);
            });
        });
    }}>
        Anteriores
    </button>
    <button className="BotonSiguiente" disabled={!nextUrl} onClick={() => {
        getpokemon(nextUrl).then(data => {
            setNextUrl(data.next);
            setPreviousUrl(data.previous);
            setCount(data.count);

            Promise.all(
                data.results.map((pokemon: pokemon) =>
                    getpokemondetalle(pokemon.url)
                )
            ).then(detalles => {
                setPokemons(detalles);
            });
        });
    }}

    >Siguientes</button>

   <Row gutter={[16, 16]}>

   
   
    {pokemons.map(pokemon => (
            
    <Col key={pokemon.id} span={4}>
       <Card title={`${pokemon.id} ${pokemon.name}` }style={{ width: 200 ,height: 200}   }>
         {pokemon.sprites?.front_default && (
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
       )}
      </Card>
   </Col>
         ))}
</Row>


   


 </div> 

}
export default Pokemones