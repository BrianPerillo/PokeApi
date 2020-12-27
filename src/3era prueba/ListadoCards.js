import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';

const ListadoCards = (props) => {

    const [pokemones, setPokemones] = useState([])
    const [urlDetalles, setUrlDetalles] = useState([])//Array con todas las Urls
    const [urlConsultaDetalles, setUrlConsultaDetalles] = useState('')//Url de un pokemon en específico
    const [detallesPokes, setDetallesPokes] = useState([])
    

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)
    const [bool, setBool] = useState(false)

    const {limitB,offsetB} = useParams();

    useEffect(()=>{  

        if(limitB!==undefined && offsetB!==undefined && bool === false){
            setBool(true)
            setOffset(parseInt(offsetB)) // Acá el problema es que están llegando los números limit y offset como string
            setLimit(parseInt(limitB))
        }

        //Consulta 1 Para datos principales
        const obtenerPokes = async () => {

            const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
            const result = await data.json();
            setPokemones(
                result.results
            )
            setUrlDetalles(
                    result.results.map(detalle => (
                        detalle.url
                    ))
                )
        }

          obtenerPokes()

          //Consulta 2 Para detalles
          const res = [];
          const loadingPokemon = async (url) =>{
            console.log("Contador");
            const data = await fetch(`${url}`)
            const result = await data.json()
            res.push(result.data);
            console.log("Contador2");

            setDetallesPokes([
                    ...detallesPokes,
                    result
                ]) 
            console.log(res);
        }

        urlDetalles.map(async (url) => {
            loadingPokemon(url)
            console.log("LOOP URL");
        })
        console.log("aaaaaaaaaaaAAAAAAAAAA");
        console.log(res);
    },[offset,limit]) 

    //console.log("OffestB y LimitB: " + offsetB,limitB);
    //console.log("Offest y Limit: " + offset,limit);
    console.log("URLDETALLES " + urlDetalles);
    console.log("LENGTH" + detallesPokes.length);

    detallesPokes.map(detalle => (
        console.log("Peso" + detalle.height)/*,
        detalle.abilities.map( ability =>(
            console.log("abilities:" + ability.ability.name)
        ))*/
    ))


    const nextPage = (offset,limit) => {
        console.log("Entro");
        setOffset(offset+10) // Acá la primera vez que se clickea no suma
        setBool(true)
        props.save(offset,limit)
        console.log("Limit y Offset al clickear nextPage" + offset,limit);
        
    }

    const previousPage = () => {

        if(offset >= 10){
            setOffset(offset-10)
            
        }

        
    }

    const listarFiltro = event => {
        event.preventDefault(); 
    }

    const handleInputChange = event => {
        console.log("onChange");
    }


    console.log(pokemones);




    return ( 
        <Fragment>
            <div className="container p-4">
                <form className="col-md-8 mx-auto" onSubmit={listarFiltro}>
                    <div className="row justify-content-center">
                        <div className="col-md-5"> 
                            <input className="form-control my-2 p-2" type="text" placeholder="Nombre, tipo, ataque, peso, género" onChange={handleInputChange}/>
                        </div>
                        <div className="col-md-2">
                        <button className="form-control btn btn-danger my-2 p-2" type="">Enviar</button>
                        </div>
                    </div>
                </form>

                <div>
                    
                        {pokemones.map(pokemon => (
                            <ul> 
                                <Link to={`/${pokemon.name}/${offset}/${limit}`} /*onClick={()=>props.save(offset,limit)}*/>
                                    <li key={pokemon.name}>{pokemon.name}{
                                        
                                    }</li>
                                    
                                </Link>
                            </ul>
                        )
                        )} 
                        {
                                            detallesPokes.map(detalle => (
                                                <p>Peso:{"peso" + detalle.height}</p>/*,
                                                
                                                <li>abilities: {
                                                    detalle.abilities.map(ability =>(
                                                        ability.ability.name
                                                    ))
                                                    }</li>
                                                                                        */
                                               
                                            ))
                                        }
                                    
                    

                </div>

                <form className="col-md-8 mx-auto" onSubmit={listarFiltro}>
                   <button className="btn btn-primary" onClick={previousPage}>{'<'}</button>
                   <Link to={`/${offset+10}/${limit}`}><button className="btn btn-primary" onClick={()=>nextPage(offset,limit)}>{'>'}</button></Link>
                </form>

            </div>
        </Fragment>
     );
}
 
export default ListadoCards;