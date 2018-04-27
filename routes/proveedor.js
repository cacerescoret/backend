var express = require('express');
var mongoose = require('mongoose');

var Proveedor = require('../models/proveedor');
var proteccionhttp = require('../middleware/proteccionhttp');

var app = express();

app.get('/', (req, res, next) =>{

    var tramo = req.query.tramo;
    tramo = Number(tramo);

    Proveedor.find({}).skip(tramo).limit(5).exec((err,datos)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error de conexión',
                errores: err 
            })
        }

        Proveedor.count({},(err,totales)=>{
            res.status(200).json({
                ok: true,
                proveedores: datos,
                //totales en ECMAScript 6
                totales: totales
            })
        })
    });
});

app.get('/:id',(req, res, next)=>{

    Proveedor.findById(req.params.id, (error, datos ) =>{
        if(error){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error de conexión',
                errores: error 
            })
        }

        res.status(200).json({
            ok: true,
            proveedor: datos
        })
    });
});


app.post('/',(req, res)=>{

    var body = req.body;

    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto
    });

    proveedor.save((err, datos)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear proveedor',
                errores: err 
            })
        }
        
        res.status(201).json({
            ok:true,
            mensaje: 'Proveedor creado',
            proveedor: datos
        })


    })

});

app.put('/:id', function(req, res, next){

    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar el proveedor',
                errores: err 
            })
        }
        res.status(200).json({
            ok: true,
            mensaje: 'El proveedor ' + datos.nombre + ' se ha actualizado' 
        })
    });
})

app.delete('/:id', proteccionhttp.checkToken, function(req, res, next){

    Proveedor.findByIdAndRemove(req.params.id, function(err, datos){
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al eliminar el proveedor',
                errores: err 
            })
        }
        res.status(200).json({
            ok: true,
            mensaje: 'El proveedor ' + datos.nombre + ' se ha eliminado' 
        })
    });
})

module.exports = app;