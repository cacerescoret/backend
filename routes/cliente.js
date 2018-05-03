var express = require('express');
var mongoose = require('mongoose');

var Cliente = require('../models/cliente.js');

var app = express();

app.get('/', (req, res, next) => {

    Cliente.find({}).exec((err, clientes)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });

});

app.get('/nombre/:nombre', (req, res, next) => {

    var nombre = req.params.nombre;

    Cliente.find({nombre: {$regex:nombre, $options: 'i'}}).exec((err, clientes)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });

});

app.get('/localidad/:localidad', (req, res, next) => {

    var localidad = req.params.localidad;

    Cliente.find({localidad: {$regex:localidad, $options: 'i'}}).exec((err, clientes)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });

});

app.get('/mixto/:nombre/:localidad', (req, res, next) => {

    var nombre = req.params.nombre;
    var localidad = req.params.localidad;

    Cliente.find({nombre:{$regex:nombre, $options: 'i'},
                  localidad:{$regex:localidad,$options:'i'}})
        .exec((err, clientes)=>{
          if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });

});


app.get('/:id', function(req, res, next){
    
    Cliente.findById(req.params.id, (err, cliente)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            cliente: cliente
        })
    })  
});


app.post('/', (req, res)=>{

    var body = req.body;

    var cliente = new Cliente({
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

    cliente.save((err, clienteGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el cliente',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            cliente: clienteGuardado
        })
    });


});

app.put('/:id', function(req, res, next){

    Cliente.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Cliente actualizado'
        });
    });

});

app.delete('/:id', function(req, res, error){

    Cliente.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Cliente eliminado';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        }); 
    })

});

module.exports = app;