const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configuración básica del servidor
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Configura tu API para obtener datos de TomTom si lo necesitas
app.get('/traffic', async (req, res) => {
  try {
    const response = await axios.get('https://api.tomtom.com/traffic/map/4/tile/flow/relative/{z}/{x}/{y}.png', {
      params: {
        key: 'YOUR_TOMTOM_API_KEY', // Inserta tu API Key aquí
        thickness: 5
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching traffic data' });
  }
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
