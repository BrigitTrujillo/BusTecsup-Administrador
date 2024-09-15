import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyImage from '../assets/img1.png';
import BusImage from '../assets/bus.png';
import TecsupImage from '../assets/tecsup.png';
import '../css/inicio.css';

export function Inicio() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Simplemente redirige al usuario a la ruta /conductor
    navigate('/conductor');

    // Muestra un mensaje de inicio de sesión exitoso
    alert('Inicio de sesión exitoso');
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
          <label className='label' htmlFor='usuario'>
            Usuario
          </label>
          <input
            className='label'
            type='text'
            id='usuario'
          />
          <label className='label' htmlFor='contraseña'>
            Contraseña
          </label>
          <input
            className='label'
            type='password'
            id='contraseña'
           
           
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
