var mongoose = require('mongoose');
//var unique = require('mongoose-unique-validator');

var PresupuestoSchema = new mongoose.Schema({
    cliente: String,
    cif: String,
    domicilio: String,
    fecha: String,
    concepto: String,
    base: Number,
    retencion: Boolean,
    tipo: Number,
    irpf: String,
    importe: String,
    total: String
})

//PresupuestoSchema.plugin(unique, { message: 'El cif introducido ya existe'});

module.exports = mongoose.model('Presupuesto', PresupuestoSchema);