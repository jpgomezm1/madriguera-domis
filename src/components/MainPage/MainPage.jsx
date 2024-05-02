import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Checkbox, Typography, Card, CardMedia, CardContent, IconButton, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OrderSummary from '../OrderSummary/OrderSummary';
import Header from '../Header/Header';


import logo from '../../assets/madriguera.jpeg';
import negro from '../../assets/negro.jpg';
import blanco from '../../assets/blanco.jpg';
import mini from '../../assets/caja.jpg';
import { barrios, deliveryCosts } from '../../data/barrios';

function MainPage() {
  const [order, setOrder] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    neighborhood: '',
    email: '',
    products: []
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [errors, setErrors] = useState({});
  const [deliveryCost, setDeliveryCost] = useState(0);

  const handleNeighborhoodChange = (event) => {
    const selectedNeighborhood = event.target.value;
    setOrder({ ...order, neighborhood: selectedNeighborhood });
    setDeliveryCost(deliveryCosts[selectedNeighborhood] || 0);
  };

  const products = [
    { id: 1, name: "Crookie Negro", price: 12000, image: negro },
    { id: 2, name: "Crookie Blanco", price: 13000, image: blanco },
    { id: 3, name: "Cajita x 5", price: 25000, image: mini }
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const handleCheckboxChange = (event, product) => {
    if (event.target.checked) {
      setOrder(prevOrder => ({
        ...prevOrder,
        products: [...prevOrder.products, { id: product.id, quantity: 1 }]
      }));
    } else {
      setOrder(prevOrder => ({
        ...prevOrder,
        products: prevOrder.products.filter(p => p.id !== product.id)
      }));
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      products: prevOrder.products.map(p =>
        p.id === id ? { ...p, quantity: Number(quantity) } : p
      )
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!order.fullName || !order.phoneNumber || !order.address || !order.neighborhood || !order.email || !order.products.length || !validateEmail(order.email) || !validatePhoneNumber(order.phoneNumber) || !termsAccepted || !privacyAccepted) {
      setErrors({
        fullName: !order.fullName ? 'Campo requerido' : '',
        phoneNumber: !order.phoneNumber ? 'Campo requerido' : !validatePhoneNumber(order.phoneNumber) ? 'Número de teléfono inválido' : '',
        address: !order.address ? 'Campo requerido' : '',
        neighborhood: !order.neighborhood ? 'Campo requerido' : '',
        email: !order.email ? 'Campo requerido' : !validateEmail(order.email) ? 'Correo electrónico inválido' : '',
        products: order.products.length === 0 ? 'Seleccione al menos un producto' : '',
        terms: !termsAccepted ? 'Debe aceptar los términos y condiciones' : '',
        privacy: !privacyAccepted ? 'Debe aceptar la política de privacidad' : ''
      });
    } else {
      setErrors({});
      // Si no hay errores, mostrar el resumen del pedido
      setShowSummary(true);
    }
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
        <Header logo={logo} />
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField fullWidth label="Nombre completo y Apellido" name="fullName" value={order.fullName} onChange={(e) => setOrder({ ...order, fullName: e.target.value })} margin="normal" error={!!errors.fullName} helperText={errors.fullName} />
            <TextField fullWidth label="Número de teléfono" name="phoneNumber" value={order.phoneNumber} onChange={(e) => setOrder({ ...order, phoneNumber: e.target.value })} margin="normal" error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
            <TextField fullWidth label="Correo Electrónico" name="email" value={order.email} onChange={(e) => setOrder({ ...order, email: e.target.value })} margin="normal" error={!!errors.email} helperText={errors.email} />
            <TextField fullWidth label="Dirección" name="address" value={order.address} onChange={(e) => setOrder({ ...order, address: e.target.value })} margin="normal" error={!!errors.address} helperText={errors.address} />
            <FormControl fullWidth margin="normal">
              <InputLabel>Barrio</InputLabel>
              <Select
                label="Barrio"
                value={order.neighborhood}
                onChange={handleNeighborhoodChange}
                error={!!errors.neighborhood}
              >
                {barrios.map((barrio) => (
                  <MenuItem key={barrio} value={barrio}>
                    {barrio}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body1" gutterBottom>Seleccione los productos que desea ordenar:</Typography>
            <Grid container spacing={2}>
              {products.map(product => (
                <Grid item xs={12} key={product.id}>
                  <Card>
                    <Grid container alignItems="center">
                      <Grid item>
                        <CardMedia component="img" image={product.image} alt={product.name} style={{ width: 'auto', maxHeight: '100px', margin: '10px' }} />
                      </Grid>
                      <Grid item xs>
                        <CardContent>
                          <Typography variant="subtitle1">{product.name}</Typography>
                          <Typography variant="body2" color="textSecondary">{product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</Typography>
                          {order.products.find(p => p.id === product.id) &&
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '7px' }}>
                              <IconButton onClick={() => handleQuantityChange(product.id, order.products.find(p => p.id === product.id).quantity - 1)} disabled={order.products.find(p => p.id === product.id).quantity <= 1}>
                                <RemoveIcon />
                              </IconButton>
                              <TextField
                                variant="outlined"
                                size="small"
                                value={order.products.find(p => p.id === product.id).quantity}
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                type="number"
                                inputProps={{ min: 1 }}
                                style={{ width: '50px' }}
                              />
                              <IconButton onClick={() => handleQuantityChange(product.id, order.products.find(p => p.id === product.id).quantity + 1)}>
                                <AddIcon />
                              </IconButton>
                            </div>
                          }
                        </CardContent>
                      </Grid>
                      <Grid item>
                        <Checkbox
                          checked={order.products.some(p => p.id === product.id)}
                          onChange={(event) => handleCheckboxChange(event, product)}
                          name={product.name}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <FormControlLabel
              control={<Checkbox checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />}
              label={<Typography variant="body2">Acepto los <Link href="/terms" target="_blank" rel="noopener">Términos y Condiciones</Link></Typography>}
            />
            <FormControlLabel
              control={<Checkbox checked={privacyAccepted} onChange={() => setPrivacyAccepted(!privacyAccepted)} />}
              label={<Typography variant="body2">Acepto la <Link href="/privacy" target="_blank" rel="noopener">Política de Privacidad</Link></Typography>}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                marginTop: '20px',
                marginBottom: '15px',
                backgroundColor: '#4CAF50',
                color: 'white'
              }}
            >
              Ordenar
            </Button>
          </form>

          <Typography variant="body2" style={{ marginTop: '10px', textAlign: 'center',  marginBottom: '10px', fontWeight: 'bold' }}>
            Punto de venta en Laureles
            <br />
            Dirección: Circular 75 #39B - 56
          </Typography>
        </Grid>
      </Grid>
      <OrderSummary isOpen={showSummary} order={order} products={products} handleClose={handleCloseSummary} deliveryCost={deliveryCost} />
    </Container>
  );
}

export default MainPage;


