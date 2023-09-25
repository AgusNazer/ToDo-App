const  User  = require('../models/UserModel');
const passport = require('passport');
const jwt = require('jsonwebtoken')

exports.registrarUsuario = async (req, res) => {
  try {
    // Obtén los datos del usuario desde el cuerpo de la solicitud
    const { username, password } = req.body;

    // Verifica si el nombre de usuario ya existe en la base de datos
    const usuarioExistente = await User.findOne({ username });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Crea un nuevo usuario
    const nuevoUsuario = new User({ username, password });

    // Guarda el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // En este punto, el usuario se ha registrado correctamente
    return res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  // Obtén las credenciales del usuario desde el cuerpo de la solicitud
  const { username, password } = req.body;

  try {
    // Verifica las credenciales del usuario (puedes utilizar tu lógica actual de verificación)
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Si las credenciales son válidas, genera un token JWT
    const token = jwt.sign({ userId: user._id }, 'tu_secreto_secreto', {
      expiresIn: '1h', // Configura la expiración del token según tus necesidades
    });

    // Envía el token JWT como respuesta
    return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
