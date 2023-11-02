import React from 'react';
import MyImage from '../assets/img1.png';
import BusImage from '../assets/bus.png';
import TecsupImage from '../assets/tecsup.png';
import '../css/inicio.css';


export function inicio() {
  return (
    <div className='inicio'>
      <div className='image'>
        <img src={MyImage} alt="login" className='fixed-image' />
      </div>
      <div className='content'>
        <div className='top-bar'>TECSUP</div>
        <div className='side-rectangle'>
          <div className="text-container">
            <p className='text'>BusTecsup</p>
            <img src={BusImage} alt="bus" className="bus-image" />
            <img src={TecsupImage} alt="tecsup" className="tecsup-image" />
          </div>
          <label className='labele' htmlFor='user'>Usuario</label>
          <input className='user' type='user' id='user' />
          <label className='labele' htmlFor='password'>Contraseña</label>
          <input type='password' id='password' />
          <div className="App">
    </div>
          <button className='btn btn-primary btn-lg btn-block'>Iniciar Sesión</button><br />
          <button className='btn btn-primary btn-lg btn-block'>Google</button><br />
        </div>
      </div>
    </div>
  );
}
export default inicio;