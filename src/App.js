import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import Index from './components/Index';
import Pokemon from './components/Pokemon'


function App() {

  const [bool, setBool] = useState(false);

  function switchIndex(){

    setBool(true);
   
  }

    //Rutas
    //Aca hay que establecer el offset y limit para pasarlo a la ruta index

  return (

    <Router>
        <Switch>
            <Route path="/:nombre/:offset/:limit">
                <Pokemon/>
            </Route>
            {
              bool ? (
                <Route path="/:offsetB/:limitB">
                  <Index switchIndex={switchIndex}/>
                </Route> 
              ):(              
              <Route path="/">
                <Index switchIndex={switchIndex}/>
              </Route>)
            }



          </Switch>
    </Router>
     
    



  );
}

export default App;
