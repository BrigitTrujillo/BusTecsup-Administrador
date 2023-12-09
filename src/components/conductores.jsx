import React, { useState, useEffect } from 'react';
import '../css/registro.css';
import eliminarImg from '../assets/eliminar.png';
import editarImg from '../assets/editar.png';
import FlechaImg from '../assets/flecha.png';

function Registro() {
  const [conductores, setConductores] = useState([]);
  const [editConductor, setEditConductor] = useState({
    id: '',
    latitud: '',
    longitud: '',
    usuario: '',
    nombre: '',
    apellido: '',
    telefono: '',
    perfil: '',
  }); 
  const [editPerfilImage, setEditPerfilImage] = useState(null); 
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const [addConductor, setAddConductor] = useState({
    latitud: '',
    longitud: '',
    usuario: '',
    nombre: '',
    apellido: '',
    telefono: '',
    perfil: '',
  });
  
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  useEffect(() => {
    fetch('https://api-node-bus.onrender.com/api/conductores')
      
    .then(response => response.json())
      .then(data => setConductores(data))
      .catch(error => console.error('Error al obtener los conductores:', error));
  }, []);

  const openEditModal = conductor => {
    setEditConductor(conductor);
    setEditPerfilImage(conductor.perfil); // Set the profile image for editing
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setEditPerfilImage(null); // Clear the profile image when closing the modal
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const handleClickEliminar = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      // Lógica para eliminar el elemento
      console.log('Elemento eliminado');
    } else {
      console.log('Eliminación cancelada');
    }
  };

  const handleAgregarConductor = () => {
    const formData = new FormData();
    formData.append('latitud', addConductor.latitud);
    formData.append('longitud', addConductor.longitud);
    formData.append('usuario', addConductor.usuario);
    formData.append('nombre', addConductor.nombre);
    formData.append('apellido', addConductor.apellido);
    formData.append('telefono', addConductor.telefono);
    formData.append('perfil', addConductor.perfil);
  
    fetch('https://api-node-bus.onrender.com/api/conductores', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Conductor agregado exitosamente:', data);
        // Actualizar la lista de conductores después de agregar uno nuevo
        setConductores(prevConductores => [...prevConductores, data]);
  
        // Limpiar el estado addConductor después de agregar
        setAddConductor({
          latitud: '',
          longitud: '',
          usuario: '',
          nombre: '',
          apellido: '',
          telefono: '',
          perfil: null,
        });
        closeAddModal();
      })
      .catch(error => console.error('Error al agregar conductor:', error));
  };
  
  const handleEditarConductor = () => {
    const formData = new FormData();
    formData.append('latitud', editConductor.latitud);
    formData.append('longitud', editConductor.longitud);
    formData.append('usuario', editConductor.usuario);
    formData.append('nombre', editConductor.nombre);
    formData.append('apellido', editConductor.apellido);
    formData.append('telefono', editConductor.telefono);
    formData.append('perfil', editPerfilImage); 
  
    fetch(`https://api-node-bus.onrender.com/api/conductores/${editConductor.id}`, {
      method: 'PUT',
       body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setConductores(prevConductores =>
          prevConductores.map(c => (c.id === data.id ? data : c))
        );
  
        setEditConductor({
          id: '',
          latitud: '',
          longitud: '',
          usuario: '',
          nombre: '',
          apellido: '',
          telefono: '',
          perfil: null,
        });
        closeEditModal();
      })
       .catch(error => console.error('Error al editar conductor:', error));
  };
  const handleClickFlecha = () => {
    // Lógica para manejar el clic en el botón "Flecha"
  };

  return (
    <div className="inicio-container">
      <h2>Lista de Conductores</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan="6">
                Conductores
                <button className='btn1' onClick={openAddModal}>+ Registrar Conductor</button>
              </th>
            </tr>
            <tr>
              <th>Latitud<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha}/></th>
              <th>Longitud<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha}/></th>
              <th>Usuario<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha}/></th>
              <th>Nombre<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha}/></th>
              <th>Apellido<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha}/></th>
              <th>Telefono<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha}/></th>
              <th>Perfil<img className="flecha" src={FlechaImg} alt="Flecha" onClick={handleClickFlecha}/></th>
              
              <th>Editar&nbsp;&nbsp;&nbsp;&nbsp;Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {conductores.map(conductor => (
              <tr key={conductor.id}>
                <td>{conductor.latitud}</td>
                <td>{conductor.longitud}</td>
                <td>{conductor.usuario}</td>
                <td>{conductor.nombre}</td>
                <td>{conductor.apellido}</td>
                <td>{conductor.telefono}</td>
                <td>
                  <img src={conductor.perfil}
                     alt={`Foto de ${conductor.nombre} ${conductor.apellido}`}
                     className="perfil-img"/>
                  </td>
                <td>
                <button className="img" onClick={() => openEditModal(conductor)}>
                <img className="img" src={editarImg} alt="Editar" />
               </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button className='img' onClick={handleClickEliminar}>
                    <img className='img' src={eliminarImg} alt="Eliminar" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      { /* Modal para agregar un conductor */}
      {addModalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeAddModal}>
              &times;
            </span>
            <h1>Registro de Conductores</h1>
            <form>
              <div className="form-group">
                <label htmlFor="input1">Latitud:</label><br />
                <input
                  type="text"
                  id="input1"
                  placeholder=""
                  value={addConductor.latitud}
                  onChange={e => setAddConductor({ ...addConductor, latitud: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input2">Longitud:</label><br />
                <input
                  type="text"
                  id="input2"
                  placeholder=""
                  value={addConductor.longitud}
                  onChange={e => setAddConductor({ ...addConductor, longitud: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input3">Usuario:</label><br />
                <input
                  type="text"
                  id="input3"
                  placeholder="usario"
                  value={addConductor.usuario}
                  onChange={e => setAddConductor({ ...addConductor, usuario: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input4">Nombre:</label><br />
                <input
                  type="text"
                  id="input4"
                  placeholder=""
                  value={addConductor.nombre}
                  onChange={e => setAddConductor({ ...addConductor, nombre: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input5">Apellido:</label><br />
                <input
                  type="text"
                  id="input5"
                  placeholder="Trujillo"
                  value={addConductor.apellido}
                  onChange={e => setAddConductor({ ...addConductor, apellido: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input7">Telefono:</label><br />
                <input
                  type="text"
                  id="input7"
                  placeholder="Puente Nuevo"
                  value={addConductor.telefono}
                  onChange={e => setAddConductor({ ...addConductor, telefono: e.target.value })}
                />
              </div><br />
              <div className="form-group">
              <label htmlFor="input8">Foto de Perfil:</label><br />
                <input
               type="file"
               id="input8"
               onChange={e => setAddConductor({ ...addConductor, perfil: e.target.value })}
                />
              </div><br/>
              <button className="submit1" type="button" onClick={handleAgregarConductor}>
                Agregar
              </button>
              <button className="submit2" type="button" onClick={closeAddModal}>
                Cancelar
              </button><br/>
            </form>
          </div>
        </div>
      )}

      { /* Modal para editar un conductor */}
      {editModalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>
              &times;
            </span>
            <h1>Actualizar Conductor</h1>
            <form>
              <div className="form-group">
                <label htmlFor="input1">Latitud:</label><br />
                <input
                  type="text"
                  id="input1"
                  placeholder={editConductor.latitud}
                  value={editConductor.latitud}
                  onChange={e => setEditConductor({ ...editConductor, latitud: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input2">Longitud:</label><br />
                <input
                  type="text"
                  id="input1"
                  placeholder={editConductor.longitud}
                  value={editConductor.longitud}
                  onChange={e => setEditConductor({ ...editConductor, longitud: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input2">Usuario:</label><br />
                <input
                  type="text"
                  id="input2"
                  placeholder={editConductor.usuario}
                  value={editConductor.usuario}
                  onChange={e => setEditConductor({ ...editConductor, usuario: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input3">Nombre:</label><br />
                <input
                  type="text"
                  id="input3"
                  placeholder={editConductor.nombre}
                  value={editConductor.nombre}
                  onChange={e => setEditConductor({ ...editConductor, nombre: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input4">Apellido:</label><br />
                <input
                  type="text"
                  id="input4"
                  placeholder={editConductor.apellido}
                  value={editConductor.apellido}
                  onChange={e => setEditConductor({ ...editConductor, apellido: e.target.value })}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="input5">Telefono:</label><br />
                <input
                  type="text"
                  id="input5"
                  placeholder={editConductor.telefono}
                  value={editConductor.telefono}
                  onChange={e => setEditConductor({ ...editConductor, telefono: e.target.value })}
                />
              </div><br />

              <div className="form-group">
              <label htmlFor="input6">Foto de Perfil:</label><br />
                <input
               type="file"
               id="input6"
               onChange={e => setEditConductor({ ...editConductor, perfil: e.target.value })}
                />
              </div><br/>
              <button className="submit1" type="button" onClick={closeEditModal}>
                Cancelar
              </button>
              <button className="submit2" type="button" onClick={handleEditarConductor}>
                Actualizar
              </button>
              <br/>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registro;
