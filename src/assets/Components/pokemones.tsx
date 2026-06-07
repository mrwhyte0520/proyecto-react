import { useState,useEffect } from "react";
import type {   pokemon,  pokemonsdetalle } from "../../api/pokeinfo/Models";
import {  getpokemon,getpokemondetalle, busquedapokemon } from "../../api/pokeinfo";
import {Card,  Col, Row, Form,Button,Input} from 'antd';


 
function Pokemones(){
  const [pokemons, setPokemons] = useState<pokemonsdetalle[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [previousUrl, setPreviousUrl] = useState<string>("");
  const [count, setCount] = useState(0);
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

    >  Siguiente</button>

   <Row gutter={[16, 16]}>

   
   
    {pokemons.map(pokemon => (
            
    <Col key={pokemon.id} span={3.5}>
       <Card className="carta"  title={  <>
    <span className="id">{pokemon.id}</span>
    <span className="nombre">{pokemon.name}</span>
  </> }   >

         {pokemon.sprites?.front_default && (
      <img className="imagencarta" src={pokemon.sprites.front_default} alt={pokemon.name} />
       )}

      <Button className="detalle">Ver mas</Button>
       
       <h1 className="tipos"> Tipo: {pokemon.types[0].type.name}</h1>

      </Card>
   </Col>
         ))}
</Row>



 


 </div> 

}
export default Pokemones