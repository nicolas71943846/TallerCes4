import React from 'react';

function Filtros({ filtro, setFiltro, busqueda, setBusqueda }) {
  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por nombre"
      />
      <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="Todos">Todos</option>
        <option value="Ingreso">Ingresos</option>
        <option value="Gasto">Gastos</option>
      </select>
    </div>
  );
}

export default Filtros;