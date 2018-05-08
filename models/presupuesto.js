var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost:27017/erp');
autoIncrement.initialize(connection);

var PresupuestoSchema = new mongoose.Schema({
    cliente: String,
    fecha: String,
    items: Array,
    suma: Number,
    tipo: Number,
    importeIVA: Number,
    total: Number
})

PresupuestoSchema.plugin(autoIncrement.plugin, { model: 'Presupuesto', field: 'numero', startAt: 1});

module.exports = mongoose.model('Presupuesto', PresupuestoSchema);