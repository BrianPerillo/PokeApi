import React, {Fragment, useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom';
import Card from '../components/Card';

const ListadoCards = (props) => {

const [boolPokemonData, setBoolPokemonData] = useState(false)
const [boolPokemonData_Type, setBoolPokemonData_Type] = useState(false)
const [boolPokemonData_Name, setBoolPokemonData_Name] = useState(false)

useEffect(() => {
    
    

}, [])

console.log(props.pokemonData);

    return ( 
        
        <Fragment>
            

        {
             !props.searchNombre ? (    // Si el searchNombre es falso es porque NO SE REALIZÓ una búsqueda x nombre, la cual sería una búsqueda que arroja un solo resultado, en cambio
                                        // se realizó una búsqueda que arroja varios resultados entonces hacemos un .map():
                props.pokemonData.map((pokemon, i) => 
                <Fragment>
                  <Card key={i} 
                        pokemon={pokemon}  
                        prev={props.prev} 
                        next={props.next} 
                        offset={props.offset} 
                        limit={props.limit}
                  />
                  </Fragment>
            )
                
             ) : (                      // En caso contrario, si searchNombre es true, es porque se realizó una búsqueda que arroja un solo resultado entonces no se hace un .map(),
                                        // sino que directamente se pasan los datos sin mapear:
                 <Fragment>                
                    <Card key={props.pokemonDataName.weight} 
                          pokemon={props.pokemonDataName} 
                          prev={props.prev} 
                          next={props.next} 
                          offset={props.offset} 
                          limit={props.limit}
                    />
                 </Fragment>
             )
        }
        

        
        {

            !props.searchNombre && !props.searchTipo ? ( //SI NO HAY SEARCH POR NOMBRE NI POR TIPO
                <Fragment>
                    <div>
                        <Link to={`/${props.offset-10}/${props.limit}`}><button className='btn btn-primary' onClick={()=>props.prev()}>{'<'}</button></Link>
                        <Link to={`/${props.offset+10}/${props.limit}`}><button className='btn btn-primary' onClick={()=>props.next()}>{'>'}</button></Link>
                    </div>
                </Fragment>
            ):(

                <Fragment>
                
                </Fragment>
            )

        }

{
            props.searchTipo && !props.searchNombre ? (    //Acá hay que preguntar si lo que llega es por una búsqueda por tipo, para eso usar booleano como search nombre pero para type, searchtype
                <Fragment>                                {/*que se setee en true si se realizó consulta por tipo y entonces los botones a mostrar serán estos que hay que modificar*/}    
                    <div>                                 {/*porque son los mismos de arriba copiados*/}
                       <button className='btn btn-primary' onClick={()=>props.prevType()}>{'a'}</button>
                        <button className='btn btn-primary' onClick={()=>props.nextType()}>{'s'}</button>
                    </div>
                </Fragment> 
               ):(  
                  <Fragment>
                      
                  </Fragment>
             )
                 
        }
        

        </Fragment>


     );
}
 
export default ListadoCards;
