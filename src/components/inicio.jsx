import React, { useState } from 'react';

import MyImage from '../assets/img1.png';
import BusImage from '../assets/bus.png';
import TecsupImage from '../assets/tecsup.png';
import '../css/inicio.css';

export function Inicio() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'https://api-node-bus.onrender.com/api/administradores';
    const response = await fetch(url ,{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ usuario: user, password: password }), // Cambiado de 'contraseña' a 'password'
});


    const data = await response.json();

    if (response.ok) {
      if (data.autenticado) {
        // Hacer algo si la autenticación es exitosa
        console.log('Autenticado exitosamente');
        window.location.href = 'http://localhost:3000/conductor'; // Reemplaza la URL con la ruta de tu página de conductor
      } else {
        // Hacer algo si la autenticación falla
        console.log('Error de autenticación');
      }
    } else {
      console.log('Error en la solicitud');
    }
  };


  return (
    <div className='inicio'>
      <div className='image'>
        <img className='image' src={MyImage} alt='login' />
      </div>
      <div className='content'>
        <div className='top-bar'>TECSUP</div>
        <div className='side-rectangle'>
          <div className='text-container'>
            <p className='text'>BusTecsup</p>
            <img src={BusImage} alt='bus' className='bus-image' />
            <img src={TecsupImage} alt='tecsup' className='tecsup-image' />
          </div>
          <label className='label' htmlFor='user'>
            Usuario
          </label>
          <input
            className='label'
            type='text'
            id='user'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label className='label' htmlFor='password'>
            Contraseña
          </label>
          <input
            className='label'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='btn btn-primary btn-lg btn-block' onClick={handleSubmit}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
