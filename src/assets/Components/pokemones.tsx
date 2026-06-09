import { useState,useEffect } from "react";
import type {   pokemon,  pokemonsdetalle } from "../../api/pokeinfo/Models";
import {  getpokemon,getpokemondetalle, busquedapokemon } from "../../api/pokeinfo";

import {Card,  Col, Row, Form,Button,Input} from 'antd';


 
function Pokemones(){
  const [pokemons, setPokemons] = useState<pokemonsdetalle[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [previousUrl, setPreviousUrl] = useState<string>("");
  const [cartaVolteada, setCartaVolteada] = useState<number | null>(null);
  const [form] = Form.useForm();
  
  const handleformsubmit = (values: any) => {
    busquedapokemon(values.search)
        .then(data => {
            setPokemons([data]);
            form.resetFields();
        })
        
        .catch(() => {
            alert("No se encontro");
            form.resetFields()
        }
    
    );
}

  useEffect(() => {
    getpokemon().then(data => {
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
}, []);
   console.log(pokemons);
 return <div>
    <h1 className="Titulo" > Mis Pokemones</h1>

    <Form  form={form} onFinish={handleformsubmit}>
        <Form.Item name="search">
           <Input placeholder="Buscar Pokemon"></Input>
        </Form.Item>
        <Form.Item>
            <Button htmlType={"submit"} type="primary" >Buscar

            </Button>
        </Form.Item>
    </Form>
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
        Anterior
    </button>
    <button className="BotonSiguiente" disabled={!nextUrl} onClick={() => {
        getpokemon(nextUrl).then(data => {
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
    }}

    >  Siguiente</button>

   <Row gutter={[16, 16]}>

   
   
    {pokemons.map(pokemon => (
    <Col key={pokemon.id} span={3.5}>
      <Card
        className={`carta${cartaVolteada === pokemon.id ? " volteada" : ""}`}
        title={
          <>
            <span className="id">{pokemon.id}</span>
            <span className="nombre">{pokemon.name}</span>
          </>
        }
      >
        <div className="contenedor-carta">
          <div className="frente">
            {pokemon.sprites?.front_default && (
              <img className="imagencarta" src={pokemon.sprites.front_default} alt={pokemon.name} />
            )}
            <h1 className="tipos">Tipo: {pokemon.types[0].type.name}</h1>
          </div>
          <div className="atras">
            <div className="contenido-atras">
              <h3>Altura: {pokemon.height}</h3>
              <h3>Peso: {pokemon.weight}</h3>
              <h3>Habilidades</h3>
              {pokemon.abilities.map(ability => (
                <p key={ability.ability.name}>{ability.ability.name}</p>
              ))}
              <h3>Estadísticas</h3>
              {pokemon.stats.map(stat => (
                <p key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</p>
              ))}
            </div>
          </div>
        </div>
        <Button
          className="detalle"
          onClick={() => setCartaVolteada(cartaVolteada === pokemon.id ? null : pokemon.id)}
        >
          {cartaVolteada === pokemon.id ? "Ocultar Estadísticas" : "Estadísticas"}
        </Button>
      </Card>
    </Col>
  ))}
</Row>



 


 </div> 

}
export default Pokemones