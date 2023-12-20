import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/reserva.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reserva = () => {
  const [data, setData] = useState([]);
  const [asientosData, setAsientosData] = useState([]);
  const [usuariosData, setUsuariosData] = useState([]);
  const [horariosData, setHorariosData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchAsientosData();
    fetchUsuariosData();
    fetchHorariosData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api-node-bus.onrender.com/api/reservas');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const fetchAsientosData = async () => {
    try {
      const response = await axios.get('https://api-node-bus.onrender.com/api/asientos');
      setAsientosData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de la API de asientos:', error);
    }
  };

  const fetchUsuariosData = async () => {
    try {
      const response = await axios.get('https://api-node-bus.onrender.com/api/usuarios');
      console.log('Usuarios Data:', response.data);
      setUsuariosData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de la API de usuarios:', error);
    }
  };

  const fetchHorariosData = async () => {
    try {
      const response = await axios.get('https://api-node-bus.onrender.com/api/horarios');
      setHorariosData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de la API de horarios:', error);
    }
  };
  
  
  const getNAsientoById = (asientoId) => {
    const asiento = asientosData.find((asiento) => asiento._id === asientoId);
    return asiento ? asiento.n_asiento : 'N/A';
  };

  const getNombreUsuarioById = (usuarioId) => {
    console.log('Usuario ID:', usuarioId);
    const usuario = usuariosData.find((usuario) => usuario._id === usuarioId);
    console.log('Usuario encontrado:', usuario);
    return usuario ? `${usuario.nombre}` : 'N/A';
  };
  
  const getHoraInicioById = (horarioId) => {
    const horario = horariosData.find((horario) => horario._id === horarioId);
    return horario ? horario.hora_inicio : 'N/A';
  };
  

  const handleImprimirManifiesto = () => {
    const reservasConfirmadas = data.filter((reserva) => reserva.confirmado);

    const doc = new jsPDF();

    const fechaHoraActual = new Date();
    const fechaHoraFormatoLocal = fechaHoraActual.toLocaleString();
    doc.text(`MANIFIESTO DE PASAJEROS - BusTecsup`, 10, 25);

    // Información adicional
    const infoAdicional = [
      ['Placa:', 'InventaUno', 'N° de Pasajeros:', reservasConfirmadas.length, 'Fecha:', fechaHoraFormatoLocal],
      ['Origen:', 'Puente Nuevo', 'Destino:', 'Tecsup-Santa Anita', 'Hora de salida:', '7:00 am'],
      ['Empresa:', 'Paradox', 'Institución:', 'Tecsup',  '1er Conductor:', 'Javier Origuela'],
    ];

    doc.autoTable({
      body: infoAdicional,
      startY: 30,
      theme: 'grid',
    });

    // Cabecera de la tabla de pasajeros
    const tableHeaders = [['ORD', 'Fecha de aborde','Asiento', 'Nombre y Apellidos','Hora del aborde', 'EMPRESA']];
    const tableData = reservasConfirmadas.map((reserva, index) => [
      index + 1,
      new Date(reserva.Fecha).toLocaleString(), 
      getNAsientoById(reserva.asientoId),
      getNombreUsuarioById(reserva.usuarioId),
      getHoraInicioById(reserva.horarioId),
      'Paradox',
    ]);

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: doc.autoTable.previous.finalY + 10,
      theme: 'grid',
    });

    doc.save('manifiesto_reservas.pdf');
  };

  return (
    <div>
      <h2>Reservas de BusTecsup</h2>
      <table className='reserva'>
        <thead>
          <tr>
            <th colSpan="5">
              Buses
              <button className='btnr' onClick={handleImprimirManifiesto}>
                Imprimir Manifiesto
              </button>
            </th>
          </tr>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Asiento</th>
            <th>Usuario</th>
            <th>Horario</th>
            <th>Confirmado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((reserva, index) => (
            <tr key={reserva._id}>
              <td>{index + 1}</td>
              <td>{new Date(reserva.Fecha).toLocaleString()}</td>
              <td>{getNAsientoById(reserva.asientoId)}</td>
              <td>{getNombreUsuarioById(reserva.usuarioId)}</td>
              <td>{getHoraInicioById(reserva.horarioId)}</td>
              <td>{reserva.confirmado ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reserva;
