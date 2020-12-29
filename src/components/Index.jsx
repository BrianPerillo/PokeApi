import React, {Fragment, useState, useEffect} from 'react';
import {getAllPokemons, getPokemon} from '../services/pokemon';
import ListadoCards from './ListadoCards';
import CardSearch from '../components/CardSearch';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    useParams
  } from 'react-router-dom';
import {useForm} from 'react-hook-form';

const Index = (props) => {
    
const[pokemonData, setPokemonData] = useState([]);
const[pokemonDataSearch, setPokemonDataSearch] = useState([]);
const[nextUrl, setNextUrl] = useState('');
const[prevUrl, setPrevUrl] = useState('');
const[loading, setLoading] = useState(true);
const[offset, setOffset] = useState(0);
const[limit, setLimit] = useState(10);
const[UrlsDetalles, setUrlDetalles] = useState([]);
var url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
const[search, setSearch] = useState(false);
const[urlsTipos, setUrlsTipos] = useState([])
const[searchNombre, setSearchNombre] = useState(false); 


const [bool, setBool] = useState(false);
const{offsetB,limitB}=useParams();

const {register, errors, handleSubmit, setValue} = useForm({


});



useEffect(()=>{
    

    if(offsetB !== undefined && limitB !== undefined && bool === false){
        setBool(true);
        setOffset(parseInt(offsetB)); // parse para pasar el offset de string a int. Llega como string porque es un parámetro que tomamos de la url, del get.
        setLimit(parseInt(limitB));
        console.log("offsetB" + offset);
        console.log("urlIndexParam" + url);
    }

    fetchData(url);

    },[offset,limit])

    async function fetchData(url){

        let response = await getAllPokemons(url);
        //setNextUrl(response.next);
        //setPrevUrl(response.previous);
        var _UrlsDetalles = response.results.map(results=>{return results.url});
        urls(_UrlsDetalles);
        let responseTwo = await loadingPokemon(_UrlsDetalles);
        setLoading(false)

    }

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
            console.log("cambio offset");
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

    const onSubmit = async (data, event) => {
        console.log("DATAAAAAAAAAAAAAAAAAAA" + data.name);
        event.preventDefault(); 
        event.target.reset();
        if(data.name){
            var urlNombre = `https://pokeapi.co/api/v2/pokemon/${data.name}`;
            const result = await getPokemon(urlNombre);
            console.log("Result de consulta onSubmit: " + result.forms.map(name=>name.name));
            setPokemonDataSearch(result);
            console.log("Resultado pokemonData despues de setear: " + pokemonDataSearch);
            setSearch(true) 
            setSearchNombre(true); //Cambiamos a true para identificar que se realizó una búsqueda X nombre (búsqueda que arroja un solo resultado)
        }
        else if(data.type){
            var urlTipo = `https://pokeapi.co/api/v2/type/${data.type}`;
            const result = await getPokemon(urlTipo);
            console.log(result.pokemon.map(pokemon=>pokemon.pokemon.url));//Hasta acá ya tengo las url de los pokemones que pertenezcan al tipo seleccionado
            const urls = result.pokemon.map(pokemon=>pokemon.pokemon.url);
            setUrlsTipos(urls);
            console.log("abajo urls seteadas en setUrlsTipos");
            console.log(urls);
            const arrayPokemonesTipo = [];
            for(var i=0; i<10; i++){
                console.log(urls[i]);
                const pokemonTipo = await getPokemon(urls[i]);
                arrayPokemonesTipo.push(pokemonTipo);
                console.log("Abajo log de arrayPokemonesTipo");
                console.log(arrayPokemonesTipo);
            }
            setPokemonData(arrayPokemonesTipo); // Acá seteamos el pokemonData cambiandole los datos que tenia por el de los pokemones filtrados por tipo
        }                                       // Entonces la card de abajo carga el nuevo contenido filtrado.
       
    }

    const handleInputChange = event => {
        console.log("onChange");
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

                <form className="col-md-8 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row justify-content-center">
                        <div className="col-md-5 mr-2"> 
                            <input className="form-control my-2 p-2" type="text" name="name" placeholder="Buscar por Nombre" onChange={handleInputChange} ref={register}/>
                        </div>
                        <div className="col-md-2 mr-2"> 
                            <select className="form-control my-2 p-2" name="type" ref={register}>
                                <option value="" selected disabled>tipo</option>
                                <option value="1">normal</option>
                                <option value="2">fighting</option>
                                <option value="3">flying</option>
                                <option value="4">poison</option>
                                <option value="5">ground</option>
                                <option value="6">rock</option>
                                <option value="7">bug</option>
                                <option value="8">ghost</option>
                                <option value="9">steel</option>
                                <option value="10">fire</option>
                                <option value="11">water</option>
                                <option value="12">grass</option>
                                <option value="13">electric</option>
                                <option value="14">psychic</option>
                                <option value="15">ice</option>
                                <option value="16">dragon</option>
                                <option value="17">dark</option>
                                <option value="18">fairy</option>
                                <option value="10001">unknown</option>
                                <option value="10002">shadow</option>
                            </select>
                        </div>
                        <div className="col-md-1 ml-2">
                        <button className="form-control btn btn-danger my-2 p-2">Enviar</button>
                        </div>
                    </div>
                </form>

                {/*
                loading ? (
                    <p>Loading...</p>
                ):(
                    <p>Data Fetched</p>
                )
                */}

                <div className="row justify-content-center">

                    <ListadoCards pokemonData={pokemonData} pokemonDataName={pokemonDataSearch} prev={prev} next={next} offset={offset} limit={limit} searchNombre={searchNombre}/>
                    {/*El searchNombre x defecto es false y cuando se hace consulta por name se setea en true(en el onSubmit), este dato se le pasa a ListadoCards que consulta 
                    este dato para saber si la Card le tiene que pasar los datos de pokemonData o de pokemonDataName*/}
                </div>


            </div>


        </Fragment>
     );
}
 
export default Index;

