import React, { useState, useRef } from 'react';
import { Drawer, List, ListItem, ListItemText, Button, Typography, Divider, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate correctamente
import QR from '../../assets/QR2.jpg';
import axios from 'axios';

const OrderSummary = ({ isOpen, order, products, handleClose, deliveryCost }) => {
  const navigate = useNavigate();  // Hook para la navegación
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const fileInputRef = useRef(null);

  const calculateTotal = () => {
    const subtotal = order.products.reduce((total, orderedProduct) => {
      const product = products.find(p => p.id === orderedProduct.id);
      return total + (product ? (product.price * orderedProduct.quantity) : 0);
    }, 0);
    return subtotal + deliveryCost;
  };

  const handleChangePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
    setShowQr(false);
    setPaymentProof(null);
  };

  const handleCompleteOrder = () => {
    if (paymentMethod === 'Transferencia' && !paymentProof) {
      setShowQr(true);
      return; // Detiene la ejecución si no se ha cargado el comprobante
    }
  
    setIsLoading(true); // Comenzar a mostrar el loader
    const formData = new FormData();
    formData.append('nombre_completo', order.fullName);
    formData.append('numero_telefono', order.phoneNumber);
    formData.append('correo_electronico', order.email);
    formData.append('direccion', order.address);
    formData.append('barrio', order.neighborhood);
    formData.append('productos', JSON.stringify(order.products));
    formData.append('metodo_pago', paymentMethod);
    if (paymentProof) {
      formData.append('comprobante', paymentProof);
    }
  
    axios.post(`${process.env.REACT_APP_API_URL}/pedido`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Pedido guardado:', response.data);
      navigate('/confirmation');
    })
    .catch(error => {
      console.error('Error al guardar el pedido:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleFileUpload = (event) => {
    if (event.target.files[0]) {
      setPaymentProof(event.target.files[0]);
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  const total = calculateTotal().toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

  const buttonLabel = paymentMethod === 'Efectivo' ? "Agendar Pedido" : (paymentProof ? "Agendar Pedido" : "Completar Pedido");
  const buttonColor = paymentMethod === 'Efectivo' || paymentProof ? "success" : "primary";

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      <List style={{ width: '320px', padding: '20px' }}>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>Resumen del pedido</Typography>
        <Divider />
        {!showQr ? (
          <>
            {order.products.map((orderedProduct) => {
              const product = products.find(p => p.id === orderedProduct.id);
              if (!product) return null;
              const subtotal = product.price * orderedProduct.quantity;
              return (
                <React.Fragment key={product.id}>
                  <ListItem>
                    <ListItemText primary={product.name} secondary={`Cantidad: ${orderedProduct.quantity}`} />
                    <Typography variant="body2">{subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
            <ListItem>
              <ListItemText primary="Costo de domicilio" />
              <Typography variant="body2">{deliveryCost.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>{total}</Typography>
            </ListItem>
            <Typography variant="subtitle1" style={{ margin: '20px 0 10px' }}>Selecciona el método de pago</Typography>
            <ListItem>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="payment-method-label">Método de pago</InputLabel>
                <Select
                  labelId="payment-method-label"
                  id="payment-method-select"
                  value={paymentMethod}
                  label="Método de pago"
                  onChange={handleChangePaymentMethod}
                >
                  <MenuItem value="Efectivo">Efectivo</MenuItem>
                  <MenuItem value="Transferencia">Transferencia</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h6">Realiza tu pago escaneando el código QR</Typography>
            <a href={QR} download="CodigoQR_Pago.jpg">
              <img src={QR} alt="Código QR de pago" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
            </a>
            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Total a pagar: {total}</Typography>
            <Typography variant="body2" style={{ marginTop: '10px' }}>Número de cuenta: 86262257101 Ahorros Bancolombia</Typography>
            <Button variant="outlined" color="primary" onClick={handleClickFileInput} style={{ marginTop: '20px' }}>
              Cargar Comprobante
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              {paymentProof ? `Archivo cargado: ${paymentProof.name}` : "Por favor, carga el comprobante de pago"}
            </Typography>
            <Typography variant="body2" style={{ marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setShowQr(false)}>
              Cambiar método de pago
            </Typography>
          </div>
        )}
        <Divider />
        <Button variant="contained" color={buttonColor} fullWidth style={{ marginTop: '20px' }} onClick={handleCompleteOrder} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : buttonLabel}
        </Button>
        <Button variant="contained" color="secondary" fullWidth onClick={handleClose} style={{ marginTop: '10px' }}>
          Continuar comprando
        </Button>
      </List>
    </Drawer>
  );
};

export default OrderSummary;









