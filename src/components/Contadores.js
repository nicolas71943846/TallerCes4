import React from 'react';

function Contadores({ contadorIngresos, contadorGastos }) {
  return (
    <div>
      <h3>Contadores</h3>
      <p>Total de Ingresos: {contadorIngresos}</p>
      <p>Total de Gastos: {contadorGastos}</p>
      <p>Total de Movimientos: {contadorIngresos + contadorGastos}</p>
    </div>
  );
}

export default Contadores;