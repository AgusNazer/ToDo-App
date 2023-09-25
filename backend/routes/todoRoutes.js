const { Router } = require('express');
const {
  getToDo,
  saveToDo,
  updateToDo,
  deleteToDo,
} = require('../controllers/ToDoController');
const passport = require('passport');

const router = Router();

// Middleware de autenticación con JWT
const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error de autenticación' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// Rutas protegidas por autenticación
router.get('/', authenticateJWT, getToDo);
router.post('/save', authenticateJWT, saveToDo);
router.post('/update', authenticateJWT, updateToDo);
router.post('/delete', authenticateJWT, deleteToDo);

module.exports = router;
