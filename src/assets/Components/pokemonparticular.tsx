import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { estadisticaspokemon } from "../../api/pokeinfo";

function EstadisticasPokemon() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<any>(null);

    useEffect(() => {
        estadisticaspokemon(Number(id))
            .then(data => setPokemon(data));
    }, [id]);

    if (!pokemon) return <h1>Cargando...</h1>;

    return (
        <div>
            <h1>{pokemon.name}</h1>

            {pokemon.stats.map((stat: any) => (
                <p key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                </p>
            ))}
        </div>
    );
}

export default EstadisticasPokemon;