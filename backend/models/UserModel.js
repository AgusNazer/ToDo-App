// const mongoose = require('mongoose');
// // const bcrypt = require('bcrypt')

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   // Cambia el nombre del campo "user" a "userId" para que coincida con el modelo ToDo
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Hace referencia al modelo de usuario
//     required: true,
//   },
// });



// const User = mongoose.model('User', userSchema);
// const Task = mongoose.model('Task', taskSchema);

// module.exports = {
//   User,
//   Task,
// };




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  jwtToken: String, // Agrega este campo para almacenar el token JWT
});
// UserModel.js
userSchema.methods.isValidPassword = function (password) {
  return password === this.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
