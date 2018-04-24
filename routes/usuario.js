var express = require('express');
var bcryptjs = require('bcryptjs');
var app = express();
var proteccionhttp = require('../middleware/proteccionhttp');

var Usuario = require('../models/usuario');

app.get('/', (req, res, next) =>{
    Usuario.find({}).exec((err,datos)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error de conexión',
                errores: err 
            })
        }

        res.status(200).json({
            ok: true,
            usuarios: datos
        })
    });
});


app.post('/', proteccionhttp.checkToken, (req,res)=>{
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        rol: body.rol
    })

    usuario.save((err, datos)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Usuario creado correctamente'
        })
    })

})

app.put('/:id', (req, res, next)=>{

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión'
            })
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol;

        usuario.save((err, usuarioModificado)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    errores: err
                })
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado correctamente'
            })


        })


    })


})

app.delete('/:id', function(req, res, next){

    Usuario.findByIdAndRemove(req.params.id, function(err, datos){
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al eliminar el usuario',
                errores: err 
            })
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Usuario eliminado correctamente' 
        })
    });
})

module.exports = app;