var mongoose = require('mongoose');
//var unique = require('mongoose-unique-validator');

var FacturaSchema = new mongoose.Schema({
    proveedor: String,
    cif: String,
    domicilio: String,
    fecha: String,
    concepto: String,
    base: Number,
    retencion: Boolean,
    tipo: Number,
    irpf: String,
    importe: String,
    total: String,
    fechaRegistro: Date
})

//FacturaSchema.plugin(unique, { message: 'El cif introducido ya existe'});

module.exports = mongoose.model('Factura', FacturaSchema);