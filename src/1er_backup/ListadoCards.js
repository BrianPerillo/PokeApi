import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';

const ListadoCards = (props) => {

    const [pokemones, setPokemones] = useState([])
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)
    const [bool, setBool] = useState(false)

    const {limitB,offsetB} = useParams();

    useEffect(()=>{  
        if(limitB!==undefined && offsetB!==undefined && bool == false){
            setBool(true)
            setOffset(parseInt(offsetB)) // Acá el problema es que están llegando los números limit y offset como string
            setLimit(parseInt(limitB))
        }
        const obtenerDetalles = async () => {

            const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
            const result = await data.json();
            setPokemones(
                result.results
            )

            console.log(offsetB,limitB);
        }         
        obtenerDetalles(); 
    },[offset,limit]) 
    console.log(offsetB,limitB);
    const nextPage = () => {
        setBool(true)
        setOffset(offset+10)
        
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
                                <Link to={`/${pokemon.name}/${offset}/${limit}`} onClick={()=>props.save(offset,limit)}><li key={pokemon.name}>{pokemon.name}</li></Link>
                            </ul>
                        )
                        )} 
                    

                </div>

                <form className="col-md-8 mx-auto" onSubmit={listarFiltro}>
                    <button className="btn btn-primary" onClick={previousPage}>{'<'}</button>
                    <button className="btn btn-primary" onClick={nextPage}>{'>'}</button>
                </form>

            </div>
        </Fragment>
     );
}
 
export default ListadoCards;