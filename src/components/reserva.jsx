import React, { useState } from 'react';
import '../css/registro.css';
import eliminarImg from '../assets/eliminar.png'; // Asegúrate de que la ruta sea correcta
import editarImg from '../assets/editar.png';
import FlechaImg from '../assets/flecha.png';

function Reserva() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

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

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  
  const openEditModal = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const handleClickFlecha = () => {
    // Lógica para manejar el clic en el botón "Eliminar"
  };
  return (
    <div className="inicio-container">
       <h2>Paraderos de BusTecsup</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan="6">
                Buses
                <button  class='btn1' onClick={openModal}>+ Añadir Paradero</button>
              </th>
             
            </tr>
            <tr>
              <th>Ruta<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
              <th>Recorrido<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
              <th>Horarios<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
              <th>Asientos<img class="flecha" src={FlechaImg} alt="Flecha"
              onClick={handleClickFlecha}/></th>
              <th>Editar&nbsp;&nbsp;&nbsp;&nbsp;Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí deberías mapear los datos de tu tabla en filas */}
            <tr>
              <td>Puente Nuevo</td>
              <td>Puente Nuevo - Tecsup</td>
              <td>7:00 am</td>
              <td>10</td>
              <td>
              <button class='img' onClick={openEditModal}>
              <img  class='img' src={editarImg} alt="Editar" />
              </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            <h1>Registro de Paradero</h1>
            <form>
  <div className="form-group">
    <label htmlFor="input1">Ruta:</label><br />
    <input type="text" id="input1" placeholder="Joaquin Marquez Perez" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input2">Recorrido:</label><br />
    <input type="text" id="input2" placeholder="Joaquin@tecsup.edu.pe" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input3">Horarios:</label><br />
    <input type="text" id="input3" placeholder="913333332" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input4">Paradero:</label><br />
    <input type="text" id="input4" placeholder="1232" />
  </div><br/>
 
  <button class="submit1" type="submit">Agregar</button>
  <button  class="submit2" type="button" onClick={closeModal}>Cancelar</button><br/>
</form>

          </div>
        </div>
      )}
    {editModalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>
              &times;
            </span>
            <h1>Actualizar Paradero</h1>
            <form>
  <div className="form-group">
    <label htmlFor="input1">Ruta:</label><br />
    <input type="text" id="input1" placeholder="Joaquin Marquez Perez" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input2">Recorrido:</label><br />
    <input type="text" id="input2" placeholder="Joaquin@tecsup.edu.pe" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input3">Horarios:</label><br />
    <input type="text" id="input3" placeholder="913333332" />
  </div><br/>
  <div className="form-group">
    <label htmlFor="input4">Paradero:</label><br />
    <input type="text" id="input4" placeholder="1232" />
  </div><br/>
 
  <button class="submit1" type="submit">Agregar</button>
  <button  class="submit2" type="button" onClick={closeModal}>Cancelar</button><br/>
</form>

  </div>
</div> 
)}</div>

    
  );
}

export default Reserva;
