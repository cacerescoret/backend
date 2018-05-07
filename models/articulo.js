var mongoose = require('mongoose');

var ArticuloSchema = new mongoose.Schema({
    referencia: String,
    precio: Number
})

module.exports = mongoose.model('Articulo', ArticuloSchema);