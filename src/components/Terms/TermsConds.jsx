import React, { useState, useEffect } from 'react';
import terminosYCondiciones from '../../assets/documents/terminosYCondiciones.txt';
import './TermsConds.css';

function TermsConds() {
  const [terminos, setTerminos] = useState('');

  useEffect(() => {
    fetch(terminosYCondiciones)
      .then(response => response.text())
      .then(data => setTerminos(data));
  }, []);

  return (
    <div className="terms-container">
      <h1>Términos y Condiciones</h1>
      <pre>{terminos}</pre>
    </div>
  );
}

export default TermsConds;