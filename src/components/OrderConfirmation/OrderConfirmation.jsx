import React from 'react';
import { Button, Typography, Container, Box, Paper } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Icono para el mensaje de confirmación
import conejo from '../../assets/conejo2.png';

const OrderConfirmation = () => {
  const whatsappMessage = "Hola, acabo de hacer un pedido en Madriguera y me gustaría obtener más información sobre mi orden. ¡Gracias!"
  const whatsappNumber = "+573016631906";

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} style={{ textAlign: 'center', padding: '40px', borderRadius: '15px', border: '1px solid #e0e0e0' }}>
          <img src={conejo} alt="Logo de la Empresa" style={{ maxWidth: '220px', marginBottom: '10px' }} />
          <Typography variant="h4" gutterBottom style={{ color: '#4CAF50' }}>
            <CheckCircleOutlineIcon style={{ verticalAlign: 'middle', fontSize: '1.5em' }} /> Pedido Confirmado
          </Typography>
          <Typography variant="subtitle1" style={{ margin: '20px 0' }}>
            ¡Gracias por tu pedido! Tu confirmación ha sido enviada por Whatsapp.
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#25D366', // Color característico de WhatsApp
              color: 'white',
              marginBottom: '20px',
              padding: '6px 12px', // Reduciendo el tamaño del padding para un botón más pequeño
              fontSize: '0.875rem' // Tamaño de fuente más pequeño para el texto
            }}
            startIcon={<WhatsAppIcon />}
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
          >
            Contactar Soporte
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default OrderConfirmation;




