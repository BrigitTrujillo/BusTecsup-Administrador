import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import inicio from './inicio';
// Importa otros componentes y páginas aquí

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={inicio} />
        {/* Agrega otras rutas según sea necesario */}
      </Switch>
    </Router>
  );
}

export default App;
