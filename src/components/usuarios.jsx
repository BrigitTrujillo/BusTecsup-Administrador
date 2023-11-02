import React, { useState } from 'react';
import '../css/registro.css';
import '../css/usuario.css';
import eliminarImg from '../assets/eliminar.png';
import FlechaImg from '../assets/flecha.png'; // Asegúrate de que la ruta sea correcta


function Usuario() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

 

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClickEliminar = () => {
    // Lógica para manejar el clic en el botón "Eliminar"
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
              <th>Codigo<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
              <th>Eliminar<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí deberías mapear los datos de tu tabla en filas */}
            <tr>
              <td>Dato 1</td>
              <td>Dato 2</td>
              <td>Dato 4</td>
              <td>Dato 5</td>
              <td>
              <button class='img' onClick={handleClickEliminar}>
              <img class='img' src={eliminarImg} alt="Eliminar" />
              </button>
              </td>
            </tr>
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
    <label htmlFor="input1">Usuario:</label><br />
    <input type="text" id="input1" placeholder="Joaquin Marquez Perez" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input2">Correo:</label><br />
    <input type="text" id="input2" placeholder="Joaquin@tecsup.edu.pe" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input3">Telefono:</label><br />
    <input type="text" id="input3" placeholder="913333332" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input4">Codigo:</label><br />
    <input type="text" id="input4" placeholder="1232" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input5">Ruta:</label><br />
    <input type="text" id="input5" placeholder="Puente Nuevo"/>
  </div><br />
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
