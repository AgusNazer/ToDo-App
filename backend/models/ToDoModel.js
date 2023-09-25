const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Hace referencia al modelo de usuario
        required: true,
    }
})
module.exports = mongoose.model('ToDo', todoSchema);