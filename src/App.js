import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SaldoInicial from './components/SaldoInicial';
import FormMovimiento from './components/FormMovimiento';
import ListaMovimientos from './components/ListaMovimientos';
import Filtros from './components/Filtros';
import Modal from './components/Modal';
import Contadores from './components/Contadores';
import './App.css';

function App() {
  const [saldoInicial, setSaldoInicial] = useState('');
  const [saldoConfirmado, setSaldoConfirmado] = useState(false);
  const [movimientos, setMovimientos] = useState([]);
  const [tipoMovimiento, setTipoMovimiento] = useState('Ingreso');
  const [nombreMovimiento, setNombreMovimiento] = useState('');
  const [cantidadMovimiento, setCantidadMovimiento] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Formatear moneda a pesos
  const formatMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO').format(valor);
  };

  // Calcular Saldo Final
  const saldoFinal =
    parseFloat(saldoInicial || 0) +
    movimientos.reduce(
      (acc, mov) => (mov.tipo === 'Ingreso' ? acc + mov.cantidad : acc - mov.cantidad),
      0
    );

  // Agregar o Editar Movimiento
  const agregarMovimiento = () => {
    const cantidad = parseFloat(cantidadMovimiento);

    // Validación de campos vacíos o cantidad inválida
    if (!nombreMovimiento || cantidad <= 0) {
      setModalTitle('Error');
      setModalMessage('Debe llenar todos los campos correctamente.');
      setShowModal(true);
      return;
    }

    // Validación de saldo suficiente si es un Gasto
    if (tipoMovimiento === 'Gasto' && cantidad > saldoFinal) {
      setModalTitle('Saldo Insuficiente');
      setModalMessage('No cuenta con saldo suficiente para realizar este movimiento.');
      setShowModal(true);
      return;
    }

    const nuevoMovimiento = {
      id: editandoId || uuidv4(),
      nombre: nombreMovimiento,
      cantidad: cantidad,
      tipo: tipoMovimiento,
    };

    if (editandoId) {
      // Editar movimiento
      setMovimientos((prevMovimientos) =>
        prevMovimientos.map((mov) => (mov.id === editandoId ? nuevoMovimiento : mov))
      );
      setEditandoId(null);
    } else {
      // Agregar nuevo movimiento
      setMovimientos([...movimientos, nuevoMovimiento]);
    }

    // Resetear formulario
    setNombreMovimiento('');
    setCantidadMovimiento('');
  };

  // Eliminar Movimiento
  const eliminarMovimiento = (id) => {
    setMovimientos(movimientos.filter((mov) => mov.id !== id));
  };

  // Editar Movimiento (prellenar formulario)
  const editarMovimiento = (mov) => {
    setNombreMovimiento(mov.nombre);
    setCantidadMovimiento(mov.cantidad);
    setTipoMovimiento(mov.tipo);
    setEditandoId(mov.id);
  };

  // Filtrar y Buscar movimientos
  const movimientosFiltrados = movimientos.filter((mov) => {
    const coincideFiltro = filtro === 'Todos' || mov.tipo === filtro;
    const coincideBusqueda =
      busqueda === '' || mov.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideFiltro && coincideBusqueda;
  });

  return (
    <div className="App">
      <h1>Gestor de Ingresos y Gastos</h1>
      <SaldoInicial
        saldoInicial={saldoInicial}
        setSaldoInicial={setSaldoInicial}
        saldoConfirmado={saldoConfirmado}
        setSaldoConfirmado={setSaldoConfirmado}
      />
      <h2>Saldo Final: {formatMoneda(saldoFinal)}</h2>

      <FormMovimiento
        nombreMovimiento={nombreMovimiento}
        setNombreMovimiento={setNombreMovimiento}
        cantidadMovimiento={cantidadMovimiento}
        setCantidadMovimiento={setCantidadMovimiento}
        tipoMovimiento={tipoMovimiento}
        setTipoMovimiento={setTipoMovimiento}
        agregarMovimiento={agregarMovimiento}
        editandoId={editandoId}
      />

      <Filtros filtro={filtro} setFiltro={setFiltro} busqueda={busqueda} setBusqueda={setBusqueda} />

      <ListaMovimientos
        movimientos={movimientosFiltrados}
        editarMovimiento={editarMovimiento}
        eliminarMovimiento={eliminarMovimiento}
        formatMoneda={formatMoneda}
      />

      <Contadores
        contadorIngresos={movimientos.filter((mov) => mov.tipo === 'Ingreso').length}
        contadorGastos={movimientos.filter((mov) => mov.tipo === 'Gasto').length}
      />

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle={modalTitle}
        modalMessage={modalMessage}
      />
    </div>
  );
}

export default App;