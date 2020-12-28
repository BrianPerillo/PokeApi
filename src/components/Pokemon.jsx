import React, { Fragment, useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import {getPokemon} from '../services/pokemon'

const Pokemon = () => {

    const {nombre,offset,limit} = useParams();
    const [detalle, setDetalle] = useState({});
    const [bool, setBool] = useState(false);
    
    useEffect(()=>{
        console.log(nombre);
        const obtenerDetalles = async () => {
  
            let response = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${nombre}`); //Hay que usar await, porque la función realiza un pedido asyncronico
            console.log(response);                                                          //entonces con el await impido que siga leyendo las lineas de codigo
            setDetalle(response);                                                           //que están abajo hasta tanto no esté disponible la respuesta.
            setBool(true);
            
        }
        obtenerDetalles();
        
    },[nombre])

    return ( 

            <Fragment>
                {bool === true ? (                                                      
                        <img src={detalle.sprites.front_default}/> 
                    ):(                                                                  
                        <img src="" alt="Loading..."/>
                        )                                                                  
                }     
                {bool === true ? ( //Uso un booleano que cambia su valor luego de que se setee detalle, para consultar justamente si está seteado, si no hago eso, sale
                    <p>Nombre: {detalle.forms.map(nombre=>{return nombre.name})}</p> //error, dice que no se puede hacer un map a un undifined. Este bool cambia
                ):(                                                                  //luego que se setee detalle para así evitar el error.
                    <p>Nombre: Loading...</p>
                )                                                                     //Eso pasa por el await, se queda esperando y no realiza el set porque hasta
                }                                                                     {/*que no se resuelva no continúa leyendo el código que tiene abajo*/}
                                                                                      {/*pero ese await no impide que se ejecute el return, entonces se ejecuta*/}
                                                                                      {/*el return y busca datos en detalle, pero detalle todavía no fue seteado*/} 
                  <p>Habilidades: </p>
                    {bool === true ? (                                                    
                        <ul>{detalle.abilities.map(data=>{return <li>{data.ability.name}</li>})}</ul>
                    ):(                                                                  
                        <p>Habilidades: Loading...</p>
                    )                                                                  
                    }

                <p>Peso: {detalle.weight}</p>                                           
                <p>Altura: {detalle.height}</p>                                        
                <p>Experiencia base: {detalle.base_experience}</p>  
                       
                                                                                        
            </Fragment>                                                                 

            

     );
}
 
export default Pokemon;