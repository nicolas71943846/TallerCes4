import React from 'react';

function FormMovimiento({
  nombreMovimiento,
  setNombreMovimiento,
  cantidadMovimiento,
  setCantidadMovimiento,
  tipoMovimiento,
  setTipoMovimiento,
  agregarMovimiento,
  editandoId,
}) {
  return (
    <div>
      <input
        type="text"
        value={nombreMovimiento}
        onChange={(e) => setNombreMovimiento(e.target.value)}
        placeholder="Nombre del Movimiento"
      />
      <input
        type="number"
        value={cantidadMovimiento}
        onChange={(e) => setCantidadMovimiento(e.target.value)}
        placeholder="Cantidad"
      />
      <select value={tipoMovimiento} onChange={(e) => setTipoMovimiento(e.target.value)}>
        <option value="Ingreso">Ingreso</option>
        <option value="Gasto">Gasto</option>
      </select>
      <button onClick={agregarMovimiento}>
        {editandoId ? 'Actualizar Movimiento' : 'Agregar Movimiento'}
      </button>
    </div>
  );
}

export default FormMovimiento;