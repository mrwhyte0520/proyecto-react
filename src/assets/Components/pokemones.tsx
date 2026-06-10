import { useState,useEffect } from "react";
import type {   pokemon,  pokemonsdetalle } from "../../api/pokeinfo/Models";
import {  getpokemon,getpokemondetalle, busquedapokemon } from "../../api/pokeinfo";

import {Card,  Col, Row, Form,Input,Button, Pagination} from 'antd';


 
function Pokemones(){
  const [pokemons, setPokemons] = useState<pokemonsdetalle[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
const [cartaVolteada, setCartaVolteada] = useState<number | null>(null);
  const [form] = Form.useForm();

  const fetchPokemonPage = (page: number) => {
    const offset = (page - 1) * pageSize;
    getpokemon(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`).then(data => {
      setCount(data.count);
      setCurrentPage(page);

      Promise.all(
        data.results.map((pokemon: pokemon) =>
          getpokemondetalle(pokemon.url)
        )
      ).then(detalles => {
        setPokemons(detalles);
      });
    });
  };
  
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
    fetchPokemonPage(1);
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
        <div
          className="card-clickable"
          onClick={() => setCartaVolteada(cartaVolteada === pokemon.id ? null : pokemon.id)}
        >
          <div className="contenedor-carta">
            <div className="frente">
              {pokemon.sprites?.front_default && (
                <img className="imagencarta" src={pokemon.sprites.front_default} alt={pokemon.name} />
              )}
              <h1 className="tipos">Tipo: {pokemon.types[0].type.name}</h1>
            </div>
            <div className="atras">
              <div className="datos-principales">
                <span>Altura: {pokemon.height}</span>
                <span>Peso: {pokemon.weight}</span>
              </div>
              <div className="seccion">
    <h3>Habilidades</h3>
                <div className="tags">
                  {pokemon.abilities.map(ability => (
                    <span key={ability.ability.name} className="tag">{ability.ability.name}</span>
    ))}
                </div>
              </div>
              <div className="seccion">
    <h3>Estadísticas</h3>
                <div className="stats-grid">
                  {pokemon.stats.map(stat => (
                    <div key={stat.stat.name} className="stat-item">
                      <span className="stat-nombre">{stat.stat.name}</span>
                      <span className="stat-valor">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  ))}
</Row>

    <div className="paginacion-container">
      <Pagination
        current={currentPage}
        total={count}
        pageSize={pageSize}
        onChange={(page) => fetchPokemonPage(page)}
        showSizeChanger={false}
      />
      <div className="botones-navegacion">
        <button className="BotonAtras" disabled={currentPage <= 1} onClick={() => fetchPokemonPage(currentPage - 1)}>
          Anterior
        </button>
        <button className="BotonSiguiente" disabled={currentPage * pageSize >= count} onClick={() => fetchPokemonPage(currentPage + 1)}>
          Siguiente
        </button>
        <button className="BotonRefrescar" onClick={() => window.location.reload()}>
          Refrescar
        </button>
      </div>
    </div>

 </div> 

}
export default Pokemones