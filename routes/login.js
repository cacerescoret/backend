var express = require('express');
var bcryptjs = require('bcryptjs');
var jsonwebtoken = require('jsonwebtoken');

var app = express();

var Usuario = require('../models/usuario');

app.post('/', (req,res)=>{

    var body = req.body;

    Usuario.findOne({email: body.email}, (err, datos)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }

        if(!datos){
            return res.status(400).json({
                ok: false,
                mensaje: 'El correo electrónico introducido no está asociado a ninguna cuenta'
            })
        }

        if (!bcryptjs.compareSync(body.password, datos.password )){
            return res.status(400).json({
                ok: false,
                mensaje: 'La contraseña introducida no es correcta'
            })
        }

        var token = jsonwebtoken.sign({usuario: datos}, 'jffxtstzefhjf', {expiresIn: 60});

        res.status(200).json({
            ok: true,
            token: token, //En ECMAScript 6 token
            nombre: datos.nombre,
            rol: datos.rol,
            _id: datos._id
        })

    })

})

module.exports = app;