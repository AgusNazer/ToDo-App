const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/todoRoutes');
const router = require('./routes/todoRoutes');

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

  app.use(routes)

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));