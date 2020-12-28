import React, {Fragment, useState, useEffect} from 'react'
import {getAllPokemons, getPokemon} from '../services/pokemon';
import Card from '../components/Card'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    useParams
  } from 'react-router-dom';

const Index = (props) => {
    
const[pokemonData, setPokemonData] = useState([]);
const[nextUrl, setNextUrl] = useState('');
const[prevUrl, setPrevUrl] = useState('');
const[loading, setLoading] = useState(true);
const[offset, setOffset] = useState(0);
const[limit, setLimit] = useState(10);
const[UrlsDetalles, setUrlDetalles] = useState([]);
var url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

const [bool, setBool] = useState(false);
const{offsetB,limitB}=useParams();


useEffect(()=>{
    

    if(offsetB !== undefined && limitB !== undefined && bool === false){
        setBool(true);
        setOffset(parseInt(offsetB)); // parse para pasar el offset de string a int. Llega como string porque es un parámetro que tomamos de la url, del get.
        setLimit(parseInt(limitB));
        console.log("offsetB" + offset);
        console.log("urlIndexParam" + url);
    }

    async function fetchData(){

        let response = await getAllPokemons(url);
        //setNextUrl(response.next);
        //setPrevUrl(response.previous);
        var _UrlsDetalles = response.results.map(results=>{return results.url});
        urls(_UrlsDetalles);
        let responseTwo = await loadingPokemon(_UrlsDetalles);
        setLoading(false)

    }

    fetchData();

    },[offset,limit])

     const urls = async (data) => {
        let arrayUrls = await Promise.all(data.map(async url => { 
            return url;                                                                                                    
        }
        ));
        setUrlDetalles(arrayUrls);
        //console.log(arrayUrls);
    }
       

   const loadingPokemon = async (data) => {
        
        let _pokemonData = await Promise.all(data.map(async url => {  //Promise.all sirve para que se ejecute solo si no hay promesas pendientes, es decir, 
            let pokemonRecord = await getPokemon(url);                //una vez que las promesas que hayan quedado en cola se resuelvan, recién ahí se ejecuta este código.
           // console.log(pokemonRecord);
            return pokemonRecord;                                         //_pokemonData es un array, porque se usando map, recordar que ap genera un array
                                                                        //Entonces cada vez que se ejecute va a ir guardando los datos en posiciones distintas sin pisarlos
        }
        ));
        console.log(_pokemonData);
        setPokemonData(_pokemonData);  //Una vez terminado el loop del map y con todos los datos guardados en el array _pokemonData, paso ese array a setPokemonData
        //console.log("POK DATA" + pokemonData.map(result=>result.height));
    }

    

    console.log(UrlsDetalles);

    //NEXT PAGE  
    const next = async () => {
            setBool(true);
            let response = await getAllPokemons(`https://pokeapi.co/api/v2/pokemon?offset=${offset+10}&limit=${limit}`) 
            //console.log("Offset" + response.results.map(result=>result.name)); // estos results, del response de la linea de arriba son los correctos, los de las siguiente pag.
            var _UrlsDetalles = response.results.map(results=>{return results.url});
            urls(_UrlsDetalles); //Acá tengo el array de urls correcto el problema era que el set dentro la función urls no producía cambios en el momento,
            //sino que esos cambios se veían reflejados recién en el próximo render o al ejecutarse la siguiente vez
            await loadingPokemon(_UrlsDetalles)//Aca por algún motivo se está pasando el array de urls viejos no el correcto, será que la linea de arriba no se está ejecutando
            setOffset(offset+10);
            // Al terminar de correr este código recién ahí se setean los nuevos arrays
            //El mismo problema ocurría con el offset, al no ser inmediato el cambio del set, no se seteaba el nuevo dato, por lo que se hacía la consulta con el offset anterior,
            //Luego si se actulizaba, pero siempre estaba un paso atrás, cuando offset debería ser 10 era 0 cuando debía ser 20 era 10, etc...
            props.switchIndex();
            
        }

    //PREVIOUS PAGE
    const prev = async () => {

            if(offset >= 10){
                let response = await getAllPokemons(`https://pokeapi.co/api/v2/pokemon?offset=${offset-10}&limit=${limit}`) 
                //console.log("Offset" + response.results.map(result=>result.name)); // estos results, del response de la linea de arriba son los correctos, los de las siguiente pag.
                var _UrlsDetalles = response.results.map(results=>{return results.url});
                urls(_UrlsDetalles); //Acá tengo el array de urls correcto
                await loadingPokemon(_UrlsDetalles)//Aca por algún motivo se está pasando el array de urls viejos no el correcto, será que la linea de arriba no se está ejecutando
                setOffset(offset-10);
                props.switchIndex();

            }
    }
/* Viejo loading con url fija, al cambiar a dinámica quedó obsoleto
 const loadingPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {  //Promise.all sirve para que se ejecute solo si no hay promesas pendientes, es decir, 
            let pokemonRecord = await getPokemon(pokemon);                //una vez que las promesas que hayan quedado en cola se resuelvan, recién ahí se ejecuta este código.
            return pokemonRecord;                                         //_pokemonData es un array, porque se usando map, recordar que ap genera un array
                                                                        //Entonces cada vez que se ejecute va a ir guardando los datos en posiciones distintas sin pisarlos
        }
        ));

        setPokemonData(_pokemonData);  //Una vez terminado el loop del map y con todos los datos guardados en el array _pokemonData, paso ese array a setPokemonData

*/

/*  // Funciones comentadas, se usaban con URL fija, al usar offset y limit dinámico quedó obsoleta
    //NEXT PAGE  
    const next = async () => {
       let data = await getAllPokemons(nextUrl)
       await loadingPokemon(data.results)
       setNextUrl(data.next)
       setPrevUrl(data.previous)
    }

    //PREVIOUS PAGE
    const prev = async () => {
        if (!prevUrl) return
        let data = await getAllPokemons(prevUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
    }
*/


    return ( 
        <Fragment>
            <div className="container">
                {
                loading ? (
                    <p>Loading...</p>
                ):(
                    <p>Data Fetched</p>
                )
                }

                <div className="row justify-content-center">
                {
                    pokemonData.map((pokemon,i) => {
                        return <Card key={i} pokemon={pokemon} offset={offset} limit={limit}/>
                    })
                }
                </div>
                
                <Link to={`/${offset-10}/${limit}`}><button className='btn btn-primary' onClick={()=>prev()}>{'<'}</button></Link>
                <Link to={`/${offset+10}/${limit}`}><button className='btn btn-primary' onClick={()=>next()}>{'>'}</button></Link>


            </div>


        </Fragment>
     );
}
 
export default Index;

