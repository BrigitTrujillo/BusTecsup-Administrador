import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/reserva.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reserva = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api-node-bus.onrender.com/api/reservas');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const handleImprimirManifiesto = () => {
    const reservasConfirmadas = data.filter((reserva) => reserva.confirmado);
  
    const doc = new jsPDF();
  
    const fechaHoraActual = new Date();
    const fechaHoraFormatoLocal = fechaHoraActual.toLocaleString();
    doc.text(`MANIFIESTO DE PASAJEROS`);
  
    // Información adicional
    const infoAdicional = [
      { title: 'Placa:', value: 'E94f23' },
      { title: 'N° de Pasajeros:', value: reservasConfirmadas.length },
      { title: 'Fecha:', value: fechaHoraFormatoLocal },
      { title: 'Origen:', value: 'Puente Nuevo' },
      { title: 'Destino:', value: 'Tecsup-Santa Anita' },
      { title: 'Hora de salida:', value: '7:00 am' },
      { title: 'Empresa:', value: 'Tecsup' },
      { title: '1er Conductor:', value: 'Javier Origuela' },
    ];
    
    doc.autoTable({
      body: infoAdicional.map(item => [
        { content: item.title, styles: { fontStyle: 'bold' } }, // Negrita
        item.value,
      ]),
      startY: 30,
      theme: 'grid', // Puedes cambiar el tema según tus preferencias (grid, striped, plain, etc.)
    });
    
  
    // Cabecera de la tabla de pasajeros
    const tableHeaders = [['ORD', 'Asiento', 'Nombre y Apellidos', 'EMPRESA']];
    const tableData = reservasConfirmadas.map((reserva, index) => [
      index + 1,
      reserva.asientoId,
      `${reserva.nombre} ${reserva.apellidos}`,
      'Tecsup',
    ]);
  
    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: doc.autoTable.previous.finalY + 10, // Ajusta la posición de inicio debajo de la info adicional
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
                <button className='btnr' onClick={handleImprimirManifiesto}>Imprimir Manifiesto</button>
              </th>
            </tr>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>QR</th>
            <th>Asiento ID</th>
            <th>Usuario ID</th>
            <th>Horario ID</th>
            <th>Confirmado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((reserva, index) => (
            <tr key={reserva._id}>
              <td>{index + 1}</td>
              <td>{new Date(reserva.Fecha).toLocaleString()}</td>
              <td>{reserva.qr}</td>
              <td>{reserva.asientoId}</td>
              <td>{reserva.usuarioId}</td>
              <td>{reserva.horarioId}</td>
              <td>{reserva.confirmado ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reserva;
