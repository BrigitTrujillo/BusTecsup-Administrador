import React from 'react';
import { BrowserRouter as Router, 
  Route, 
  Routes,
  Link
} from 'react-router-dom';
import Inicio from './components/inicio';
import Conductor from './components/conductores';
import Usuario from './components/usuarios';
import Reserva from './components/reserva';

import './css/registro.css';


function App() {
  return (
    <Router>
  <div className="inicio-navbar">
    <div className="navbar-left">
      <ul>
        <li>
          <Link to="/conductor">Conductores</Link>
        </li>
        <li>
          <Link to="/usuario">Usuarios</Link>
        </li>
        <li>
          <Link to="/reserva">Reservas</Link>
        </li>
      </ul>
    </div>
    <div className="navbar-right">
      <div className="user-profile">
        <img src="url_de_tu_imagen" alt="User Profile" className="user-image" />
      </div>
    </div>
  </div>
  <div className="container mt-5">
    <div className="container"></div>
    <div className="btn-group">
      <Link to="/conductor" className="btn btn-dark">
        conductores
      </Link>
      <Link to="/usuario" className="btn btn-dark">
        Usuarios
      </Link>
      <Link to="/reserva" className="btn btn-dark">
        Reservas
      </Link>
    </div>
    <hr></hr>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/conductor" element={<Conductor />} />
      <Route path="/usuario" element={<Usuario />} />
      <Route path="/reserva" element={<Reserva />} />
    </Routes>
  </div>
</Router>

  );
}

export default App;