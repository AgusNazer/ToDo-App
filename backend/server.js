const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); 

const passport = require('passport')

const routes = require('./routes/todoRoutes');
const registroRoutes = require('./routes/authRoute');

// const passportConfig = require('./passportConfig')
const passportConfig = require('./passportConfig');

passportConfig(passport);

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

// Configura express-session
app.use(session({
  secret: 'your-secret-key', // Cambia esto a una clave secreta segura
  resave: false,
  saveUninitialized: true,
}));


//  Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(registroRoutes);



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