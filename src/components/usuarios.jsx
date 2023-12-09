import React, { useState, useEffect } from 'react';
import '../css/registro.css';
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

  
  const [modalIsOpen, setModalIsOpen] = useState(false);

 

  const closeModal = () => {
    setModalIsOpen(false);
  };
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
              <th>Reservas<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/>
              </th>
              <th>Usuario<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
              <th>Correo<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
              
              <th>Eliminar<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
            </tr>
          </thead>
          <tbody>
          {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>Puente Nuevo</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td> 
              
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




      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h1>Registro de Conductores</h1>
            <form>
  <div className="form-group">
    <label class="label" htmlFor="input1">Reserva:</label><br />
    <input type="text" id="input1" placeholder="Joaquin Marquez Perez" />
  </div><br/>
  <div className="form-group">
    <label class="label" htmlFor="input2">Usuario:</label><br />
    <input type="text" id="input2" placeholder="Joaquin@tecsup.edu.pe" />
  </div><br/>
  <div className="form-group">
    <label class="label" htmlFor="input3">Correo:</label><br />
    <input type="text" id="input3" placeholder="913333332" />
  </div><br/>

  <button class="submit1" type="submit">Agregar</button>
  <button  class="submit2" type="button" onClick={closeModal}>Cancelar</button><br/>
</form>

          </div>
        </div>
      )}
    </div>
  );
}

export default Usuario;