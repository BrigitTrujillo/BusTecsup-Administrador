import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import '../css/usuario.css';
import eliminarImg from '../assets/eliminar.png';
import FlechaImg from '../assets/flecha.png'; // Asegúrate de que la ruta sea correcta


function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  

  useEffect(() => {
    fetch('https://api-node-bus.onrender.com/api/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al obtener los usuarios:', error));
  }, []);


  

  const handleClickEliminar = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      // Aquí puedes realizar la lógica para eliminar el elemento
      console.log('Elemento eliminado');
    } else {
      console.log('Eliminación cancelada');
    }
  };

  const handleClickFlecha = () => {
    // Lógica para manejar el clic en el botón "Eliminar"
  };
  

 
  return (

    <div className="inicio-container">
          <h2>Lista de Usuarios</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan="6">
                Usuarios <img class="eliminar" src={eliminarImg} alt="Eliminar" />
                <span class="eliminar-texto">Eliminar</span>
              </th> 
     
            </tr>
            <tr>
              <th>Usuario<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/>
              </th>
              <th>Correo<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
              <th>Perfil<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
              
              <th>Eliminar<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
            </tr>
          </thead>
          <tbody>
          {usuarios.map(usuario => (
              <tr key={usuario.id}>
                
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td> 
                <td>
                  <img src={usuario.perfil}
                     alt={`Foto de ${usuario.nombre} ${usuario.apellido}`}
                     className="perfil-img"/>
                  </td>
              
                <td>
           
              <button class='img' onClick={handleClickEliminar}>
              <img class='img' src={eliminarImg} alt="Eliminar" />
              </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuario;