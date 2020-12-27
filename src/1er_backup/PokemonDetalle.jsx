import React, {Fragment, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetalle = () => {

    const [abilities, setAbilities] = useState([])
    const [img, setImg] = useState([])

    const {name,limit,offset} = useParams();

    useEffect(()=>{
        const obtenerDetallesPoke = async () => {
        
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const result = await data.json();
            setAbilities(
                result["abilities"]
            );
            setImg(
                result["sprites"]["other"]["official-artwork"]["front_default"]
            )
        }        
        console.log(`https://pokeapi.co/api/v2/pokemon/${name}`)

        obtenerDetallesPoke(); 
    },[name]) //Se usa ,[] para que el useEffect se ejecute una sola vez, sino entra en un loop infinito

    console.log(abilities);
    console.log(img);

    return ( 
        <Fragment>
            <img src={`${img}`} width="300" height="300"/>
            <h3>Habilidades</h3>
            {abilities.map(habilidad =>(
                <p>{habilidad.ability.name}</p>
            ))
            }
        </Fragment>
     );
}
 
export default PokemonDetalle;