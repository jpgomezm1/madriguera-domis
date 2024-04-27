import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Checkbox, Typography, Card, CardMedia, CardContent, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OrderSummary from '../OrderSummary/OrderSummary';
import Header from '../Header/Header'

import logo from '../../assets/madriguera.jpeg';
import negro from '../../assets/crookienegro.webp';
import blanco from '../../assets/crookieblanco.webp';
import mini from '../../assets/cajita.webp';

const barrios = ["Poblado", "Envigado", "Laureles - Estadio", "Bello", "Itagui", "Sabaneta", "Industriales", "Loma de los Bernal", "Guayabal", "La America", "Belen", "Robledo", "Castilla", "Calasanz", "Alpujarra", "La Candelaria"];

function MainPage() {
  const [order, setOrder] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    neighborhood: '',
    email: '',
    products: []
  });
  const [showSummary, setShowSummary] = useState(false);

  const products = [
    { id: 1, name: "Crookie Negro", price: 12000, image: negro },
    { id: 2, name: "Crookie Blanco", price: 13000, image: blanco },
    { id: 3, name: "Cajita x 5", price: 25000, image: mini }
  ];

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
    setShowSummary(true);
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
            <TextField fullWidth label="Nombre completo" name="fullName" value={order.fullName} onChange={(e) => setOrder({ ...order, fullName: e.target.value })} margin="normal" />
            <TextField fullWidth label="Número de teléfono" name="phoneNumber" value={order.phoneNumber} onChange={(e) => setOrder({ ...order, phoneNumber: e.target.value })} margin="normal" />
            <TextField fullWidth label="Correo Electrónico" name="email" value={order.phoneNumber} onChange={(e) => setOrder({ ...order, phoneNumber: e.target.value })} margin="normal" />
            <TextField fullWidth label="Dirección" name="address" type="email" value={order.email} onChange={(e) => setOrder({ ...order, email: e.target.value })} margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Barrio</InputLabel>
              <Select
                label="Barrio"
                value={order.neighborhood}
                onChange={(e) => setOrder({ ...order, neighborhood: e.target.value })}
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
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '7px'}}>
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
        </Grid>
      </Grid>
      <OrderSummary isOpen={showSummary} order={order} products={products} handleClose={handleCloseSummary} />
    </Container>
  );
}

export default MainPage;
