import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/paradero.css';

import eliminarImg from '../assets/eliminar.png';
import editarImg from '../assets/editar.png';
import FlechaImg from '../assets/flecha.png';

function Paradero() {
  const [paraderos, setParaderos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedParadero, setSelectedParadero] = useState(null);

  useEffect(() => {
    // Lógica para obtener los paraderos desde la API
    axios.get('https://api-node-bus.onrender.com/api/paraderos')
      .then(response => setParaderos(response.data))
      .catch(error => console.error('Error al obtener los paraderos:', error));
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };
  




  const [rutas, setRutas] = useState([]);

  const handleUpdateParadero = async (e) => {
    e.preventDefault();
  
    try {
      // Lógica para enviar la solicitud de actualización a la API
      console.log('Paradero actualizado');
      closeEditModal();
    } catch (error) {
      console.error('Error al actualizar el paradero:', error);
    }
  };

  const handleInputChange = (e, field) => {
    setSelectedParadero({
      ...selectedParadero,
      [field]: e.target.value,
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const rutasData = await axios.get('https://api-node-bus.onrender.com/api/rutas');
        setRutas(rutasData.data);
      } catch (error) {
        console.error('Error al obtener las rutas:', error);
      }
    };
  
    fetchRutas(); // Llama a la función de obtención de rutas al cargar el componente
  }, []);

  const fetchData = async () => {
    try {
      const paraderosData = await axios.get('https://api-node-bus.onrender.com/api/paraderos');
      const paraderos = paraderosData.data;

      const updatedParaderos = await Promise.all(paraderos.map(async (paradero) => {
        try {
          const rutaResponse = await axios.get(`https://api-node-bus.onrender.com/api/rutas/${paradero.rutaId}`);
  
          return {
            ...paradero,
            puntoInicio: rutaResponse.data.punto_inicio,
            puntoDestino: rutaResponse.data.punto_destino,
          };
        } catch (error) {
          console.error('Error al obtener información adicional:', error);
          return null;
        }
      }));
  
      setParaderos(updatedParaderos.filter(Boolean)); // Filtra los elementos nulos
    } catch (error) {
      console.error('Error al obtener los paraderos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleClickEliminar = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este paradero?')) {
      // Lógica para eliminar el paradero
      console.log('Paradero eliminado');
    } else {
      console.log('Eliminación cancelada');
    }
  };

  const closeEditModal = () => {
    setSelectedParadero(null);
    setEditModalIsOpen(false);
  };

  const handleAddParadero = async (e) => {
    e.preventDefault();
  
    try {
      // Lógica para enviar la solicitud de creación a la API
      const nuevoParadero = {
        nombre_paradero: selectedParadero.nombre_paradero,
        latitud: selectedParadero.latitud,
        longitud: selectedParadero.longitud,
        // Otros campos según la estructura de tu objeto paradero y los campos del formulario
      };
  
      // Realiza la solicitud POST para agregar el nuevo paradero
      await axios.post('https://api-node-bus.onrender.com/api/paraderos', nuevoParadero);
  
      // Refresca la lista de paraderos
      fetchData();
  
      // Cierra el modal después de agregar el paradero
      closeModal();
    } catch (error) {
      console.error('Error al agregar el paradero:', error);
    }
  };

  const handleClickFlecha = () => {
    // Lógica para manejar el clic en el botón "Eliminar"
  };

  const openEditModal = (paradero) => {
    setSelectedParadero(paradero);
    console.log(paradero.nombre_paradero); 
    setEditModalIsOpen(true);
  };

  return (
    <div className="inicio-container">
      <h2>Paraderos de BusTecsup</h2>
      <div className="table-container">
        <table>
          <thead>
          <tr>
  <th colSpan="6">
    Paraderos
    <button className='btn1' onClick={openModal}>+ Añadir Paradero</button>
  </th>
</tr>
            <tr>
              <th>Nombre Paradero<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha} /></th>
              <th>Latitud<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha} /></th>
              <th>Longitud<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha} /></th>
              <th>Ruta<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha} /></th>
              <th>Punto de Partida<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha} /></th>
              <th>Punto de Destino<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha} /></th>
              <th>Editar&nbsp;&nbsp;&nbsp;&nbsp;Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {paraderos.map(paradero => (
              <tr key={paradero._id}>
                <td>{paradero.nombre_paradero}</td>
                <td>{paradero.latitud}</td>
                <td>{paradero.longitud}</td>
                <td>{paradero.rutaId}</td>
                <td>{paradero.puntoInicio}</td>
                <td>{paradero.puntoDestino}</td>
                <td>
                  <button className='img' onClick={() => openEditModal(paradero)}>
                    <img className='img' src={editarImg} alt="Editar" />
                  </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button className='img' onClick={() => handleClickEliminar(paradero._id)}>
                    <img className='img' src={eliminarImg} alt="Eliminar" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      {modalIsOpen && (
        <div className="modal">
          <div  className="mi-nueva-clase">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h1>Registro de Paradero</h1>
            <form onSubmit={handleAddParadero}   className='registro-form1'>
              <div className="form-group">
                <label className="registro-label">Nombre del Paradero:</label><br />
                <input
                  type="text"
                  value={selectedParadero?.nombre_paradero || ''}
                  onChange={(e) => handleInputChange(e, 'nombre_paradero')}
                />
              </div>
              <div className="form-group">
                <label className="registro-label">Latitud:</label><br />
                <input
                  type="text"
                  value={selectedParadero?.latitud || ''}
                  onChange={(e) => handleInputChange(e, 'latitud')}
                />
              </div>
              <div className="form-group">
                <label className="registro-label">Longitud:</label><br />
                <input
                  type="text"
                  value={selectedParadero?.longitud || ''}
                  onChange={(e) => handleInputChange(e, 'longitud')}
                />
              </div>
              <div className="form-group">
                <label className="registro-label">Ruta:</label><br />
                <select
                  value={selectedParadero?.rutaId || ''}
                  onChange={(e) => handleInputChange(e, 'rutaId')}
                >
                  <option value="">Seleccionar Ruta</option>
                  {rutas.map(ruta => (
                    <option key={ruta._id} value={ruta._id}>{`${ruta.punto_inicio} - ${ruta.punto_destino}`}</option>
                  ))}
                </select>
              </div><br />
              {/* Otros campos según la estructura de tu objeto paradero y los campos del formulario */}
              <div className="form-group">
                <button className="submit1" type="submit">Agregar</button>
                <button className="submit2" type="button" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editModalIsOpen && (
        <div className="modal">
          <div className="mi-nueva-clase">
            <span className="close" onClick={closeEditModal}>
              &times;
            </span>
            <h1>Actualizar Paradero</h1>
            <form onSubmit={handleUpdateParadero}>
              <div className="form-group">
                <label className="registro-label">Nombre del Paradero:</label><br />
                <input
                  type="text"
                  value={selectedParadero?.nombre_paradero || ''}
                  onChange={(e) => handleInputChange(e, 'nombre_paradero')}
                />
              </div>
              <div className="form-group">
                <label className="registro-label">Latitud:</label><br />
                <input
                  type="text"
                  value={selectedParadero?.latitud || ''}
                  onChange={(e) => handleInputChange(e, 'latitud')}
                />
              </div>
              <div className="form-group">
                <label className="registro-label">Longitud:</label><br />
                <input
                  type="text"
                  value={selectedParadero?.longitud || ''}
                  onChange={(e) => handleInputChange(e, 'longitud')}
                />
              </div>
              {/* Otros campos según la estructura de tu objeto paradero y los campos del formulario */}
              <div className="form-group">
                <button className="submit1" type="submit">Actualizar</button>
                <button className="submit2" type="button" onClick={closeEditModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Paradero;
