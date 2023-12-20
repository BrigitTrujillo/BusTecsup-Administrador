import React, { useState } from 'react';
import MyImage from '../assets/img1.png';
import BusImage from '../assets/bus.png';
import TecsupImage from '../assets/tecsup.png';
import '../css/inicio.css';

export function Inicio() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!usuario || !contraseña) {
        setError('Por favor, completa todos los campos.');
        return;
      }

      const url = 'https://api-node-bus.onrender.com/api/administradores';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.autenticado) {
          console.log('Autenticado exitosamente');
          setSuccessMessage('Inicio de sesión exitoso');
          // Puedes redirigir o realizar otras acciones después del inicio de sesión exitoso
        } else {
          if (data.error === 'Contraseña incorrecta') {
            setError('Contraseña incorrecta');
          } else if (data.error === 'Usuario no encontrado') {
            setError('Usuario no encontrado');
          } else {
            setError('Credenciales inválidas');
          }
        }
      } else if (response.status === 404) {
        setError('Usuario no encontrado');
      } else {
        setError('Error en la solicitud');
        console.error('Error en la solicitud:', data.message || 'Error desconocido');
      }
    } catch (error) {
      setError('Error inesperado');
      console.error('Error inesperado:', error.message || 'Error desconocido');
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
          <label className='label' htmlFor='usuario'>
            Usuario
          </label>
          <input
            className='label'
            type='text'
            id='usuario'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label className='label' htmlFor='contraseña'>
            Contraseña
          </label>
          <input
            className='label'
            type='password'
            id='contraseña'
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button className='btn btn-primary btn-lg btn-block' onClick={handleSubmit}>
            Iniciar Sesión
          </button>
          {error && <p className='error-message'>{error}</p>}
          {successMessage && <p className='success-message'>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Inicio;
