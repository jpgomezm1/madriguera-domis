import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import MainPage from './components/MainPage/MainPage';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation'; // Asegúrate de que la ruta de importación sea correcta

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/confirmation" element={<OrderConfirmation userEmail="example@example.com" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;









