var express = require('express');
var mongoose = require('mongoose');

var Presupuesto = require('../models/presupuesto.js');

var app = express();

app.get('/', (req, res, next) => {

    Presupuesto.find({}).exec((err, presupuestos)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            presupuestos: presupuestos
        })
    });

});

app.get('/:id', function(req, res, next){
    
    Presupuesto.findById(req.params.id, (err, presupuesto)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            presupuesto: presupuesto
        })
    })  
});


app.post('/', (req, res)=>{

    var body = req.body;

    var presupuesto = new Presupuesto({
        proveedor: body.proveedor,
        cif: body.cif,
        domicilio: body.domicilio,
        fecha: body.fecha,
        concepto: body.concepto,
        base: body.base,
        retencion: body.retencion,
        tipo: body.tipo,
        irpf: body.irpf,
        importe: body.importe,
        total: body.total
    });

    presupuesto.save((err, presupuestoGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el presupuesto',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            presupuesto: presupuestoGuardado
        })
    });


});

app.put('/:id', function(req, res, next){

    Presupuesto.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Presupuesto actualizado'
        });
    });

});

app.delete('/:id', function(req, res, error){

    Presupuesto.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Presupuesto eliminado';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        }); 
    })

});

module.exports = app;