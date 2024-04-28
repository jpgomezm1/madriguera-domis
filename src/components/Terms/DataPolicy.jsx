import React, { useState, useEffect } from 'react';
import politicaTratamientoDatos from '../../assets/documents/politicaTratamientoDatos.txt';
import './TermsConds.css';

function DataPolicy() {
  const [politica, setPolitica] = useState('');

  useEffect(() => {
    fetch(politicaTratamientoDatos)
      .then(response => response.text())
      .then(data => setPolitica(data));
  }, []);

  return (
    <div className="terms-container">
      <h1>Política de Tratamiento de Datos</h1>
      <pre>{politica}</pre>
    </div>
  );
}

export default DataPolicy;