var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: {type: String, unique: true},
    password: String,
    rol: String,
    sesiones: Array
})

UsuarioSchema.plugin(unique, { message: 'Ya existe una cuenta con ese correo electrónico'});

module.exports = mongoose.model('Usuario', UsuarioSchema);