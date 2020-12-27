import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import Index from './components/Index';
import Card from './components/Card'
import Pokemon from './components/Pokemon'

function App() {

    //Rutas



  return (

    <Router>
        <Switch>
            <Route path="/:nombre">
                <Pokemon/>
            </Route>
            <Route path="/">
                <Index/>
            </Route>
          </Switch>
    </Router>
     
    



  );
}

export default App;
