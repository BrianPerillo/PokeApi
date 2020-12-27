import React, {Fragment} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom';

const Card = ({pokemon}) => {


    return ( 
        <Fragment>
        <div class="col-md-2 m-3 profile-card-1">
        <Link to='pokemon' style={{textDecoration: 'none', color:'white'}}>
        <div class="img"><img src={pokemon.sprites.front_default}/></div><a class="view-more" href=""><i class="fa fa-plus-circle" aria-hidden="true"></i>
            <div class="popup"></div></a>
        <div class="mid-section">
            <div class="name">
                <p>Nombre:</p> {pokemon.forms.map(nombre => {
                return (nombre.name)
            })}
            </div>
            
            <div class="description">
                <p>Tipos:</p>
                {pokemon.types.map(type => {
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
       
        </Link>
        </div>
        

        </Fragment>


     );
}
 
export default Card;
