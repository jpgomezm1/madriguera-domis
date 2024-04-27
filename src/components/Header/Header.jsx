// Header.jsx
import React from 'react';
import { Grid, Typography } from '@mui/material';

function Header({ logo }) {
  return (
    <Grid item xs={12} style={{ textAlign: 'center' }}>
      <img src={logo} alt="Logo de Cafe Madriguera" style={{ maxWidth: '150px', marginTop: '20px' }} />
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido al canal de domicilios de Madriguera
      </Typography>
      <Typography variant="body1" gutterBottom>
        Por favor, llena el formulario a continuación para completar tu pedido.
      </Typography>
    </Grid>
  );
}

export default Header;
