var express = require('express');
var mongoose = require('mongoose');

var Sesion = require('../models/sesion');

var app = express();

app.get('/', (req, res, next) =>{

    var nombre = req.query.nombre;

    Sesion.find({nombre:nombre})
          .sort({_id:-1})
          .exec((err,datos)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error de conexión',
                    errores: err 
                })
            }
            res.status(200).json({
                ok: true,
                sesiones: datos
            })
        });
});


app.post('/',(req, res)=>{

    var body = req.body;

    var sesion = new Sesion({
        nombre: body.nombre,
        login: body.login,
        logout: body.logout,
        duracion: body.duracion
    });
    sesion.save((err, datos)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear sesión',
                errores: err 
            })
        }
        
        res.status(201).json({
            ok:true,
            mensaje: 'sesion registrada',
            sesion: datos
        })
    })
});

module.exports = app;