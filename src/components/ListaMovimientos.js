import React from 'react';

function ListaMovimientos({ movimientos, editarMovimiento, eliminarMovimiento, formatMoneda }) {
  return (
    <ul>
      {movimientos.map((mov) => (
        <li key={mov.id} style={{ color: mov.tipo === 'Ingreso' ? 'green' : 'red' }}>
          {mov.nombre} - {mov.tipo}: {formatMoneda(mov.cantidad)}
          <button onClick={() => editarMovimiento(mov)}>Editar</button>
          <button onClick={() => eliminarMovimiento(mov.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default ListaMovimientos;