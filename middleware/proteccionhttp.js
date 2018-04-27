var jsonwebtoken = require('jsonwebtoken');

exports.checkToken = function(req, res, next){
    var token = req.query.token;

    jsonwebtoken.verify(token, 'jffxtstzefhjf', (err, decoded)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'token incorrecto'
            })
        }

        req.usuario = decoded.usuario;
        next();

    });



}