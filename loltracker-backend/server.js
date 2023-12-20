// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/api/summoner/:username', async (req, res) => {
  const { username } = req.params;
  const { region } = req.query; // Obtener la región desde la query

  // Mapear las regiones a sus respectivas URLs
  const regionURLs = {
    br1: 'br1.api.riotgames.com',
    eun1: 'eun1.api.riotgames.com',
    la2: 'la2.api.riotgames.com'
  };

  const API_KEY = 'RGAPI-42187f04-76e1-45a8-971a-948ce7987d8e'; // Clave API de Riot Games
  const baseURL = `https://${regionURLs[region]}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(username)}`;

  try {
    const response = await axios.get(baseURL, {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos del usuario' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend iniciado en el puerto ${PORT}`);
});
