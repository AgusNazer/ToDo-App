// const ToDoModel = require('../models/ToDoModel');

// module.exports.getToDo = async(req, res) => {
//     const ToDo = await ToDoModel.find()
//     res.send(ToDo)
// }

// module.exports.saveToDo = async(req, res) => {
// const { text } = req.body

//    ToDoModel
//    .create({text})
//    .then((data) => {
//     console.log('Added Successfully...');
//     console.log(data);
//     res.send(data)
//    })
// }

// module.exports.updateToDo = async(req, res) => {
//     const { _id, text } = req.body
    
//        ToDoModel
//        .findByIdAndUpdate(_id, { text })
//        .then(() => res.send('Updated Successfully...'))
//         .catch((err) => console.log(err))
// }

// module.exports.deleteToDo = async(req, res) => {
//     const { _id } = req.body
    
//        ToDoModel
//        .findByIdAndDelete(_id,)
//        .then(() => res.send('Deleted Successfully...'))
//         .catch((err) => console.log(err))
// }


// VERSION PARA CADA USUARUIO CON SUS TAREAS

const ToDoModel = require('../models/ToDoModel');

module.exports.getToDo = async (req, res) => {
  // Obtén el ID del usuario actual desde la autenticación
  const userId = req.user.id; // Asegúrate de configurar esto en tu middleware de autenticación

  const ToDo = await ToDoModel.find({ userId }); // Filtra las tareas por usuario
  res.send(ToDo);
}

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id; // Obtiene el ID del usuario actual desde la autenticación

  ToDoModel
    .create({ text, userId }) // Asocia la tarea con el usuario actual
    .then((data) => {
      console.log('Added Successfully...');
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error al crear la tarea.');
    });
}

module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;

  ToDoModel
    .findOneAndUpdate({ _id, userId: req.user.id }, { text }) // Asegura que la tarea pertenezca al usuario actual
    .then(() => res.send('Updated Successfully...'))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error al actualizar la tarea.');
    });
}

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;

  ToDoModel
    .findOneAndDelete({ _id, userId: req.user.id }) // Asegura que la tarea pertenezca al usuario actual
    .then(() => res.send('Deleted Successfully...'))
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error al eliminar la tarea.');
    });
}
