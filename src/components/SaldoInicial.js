import React from 'react';

function SaldoInicial({ saldoInicial, setSaldoInicial, saldoConfirmado, setSaldoConfirmado }) {
  return (
    <div>
      <input
        type="number"
        value={saldoInicial}
        onChange={(e) => setSaldoInicial(e.target.value)}
        placeholder="Saldo Inicial"
        disabled={saldoConfirmado}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && saldoInicial !== '') setSaldoConfirmado(true);
        }}
      />
      {!saldoConfirmado && (
        <button onClick={() => saldoInicial !== '' && setSaldoConfirmado(true)}>Confirmar Saldo</button>
      )}
    </div>
  );
}

export default SaldoInicial;