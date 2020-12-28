import React, {Fragment} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom';


const CardSearch = (props) => {

const nombre = props.pokemonData.forms.map(name=>name.name);

    return ( 
        <Fragment>

        <div class="col-md-2 m-3 profile-card-1">
        
            <div class="img"><img src={props.pokemonData.sprites.front_default}/></div>
            <Link to={`/${nombre}/${props.offset}/${props.limit}`} // Paso el nombre del pokemon para la URL y offset y limit para volver a última página visitada
                style={{textDecoration: 'none', color:'white'}}>
                <button className="btn btn-propio">
                    <a class="view-more">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </a>
                </button>
            </Link>
            <div class="popup"></div>
            <div class="mid-section">
                <div class="name">
                    {props.pokemonData.forms.map(nombre => {
                    return (nombre.name)
                })}
                </div>
                
                <div class="description">
                    <p>Tipos:</p>
                    {props.pokemonData.types.map(type => {
                    return(<p style={{float:'left'}}>{type.type.name}</p>) 
                    }
                    )}
                    <br/>
                </div>
                <div class="line"></div>
                <div class="stats">
                <div class="stat">81.3M
                    <div class="subtext">Favoritos</div>
                </div>
                <div class="stat">822k
                    <div class="subtext">Likes</div>
                </div>
                <div class="stat">
                    <button>Fav</button>
                </div>
                </div>
            
            </div>
        
        
        </div>
        

        </Fragment>
     );
}
 
export default CardSearch;