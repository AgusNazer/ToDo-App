const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController'); // Importa el controlador de autenticación
// const User = require('../models/UserModel'); // esta linea la uso en el controller

// Registro de usuario utilizando el controlador
router.post('/registro', authController.registrarUsuario);

// Inicio de sesión

router.post('/login', authController.login);

// router.post('/login', authController.iniciarSesion);

module.exports = router;
