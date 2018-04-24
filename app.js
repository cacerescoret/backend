var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');
var factura = require('./routes/factura');
var cliente = require('./routes/cliente');
var presupuesto = require('./routes/presupuesto');
var usuario = require('./routes/usuario');
var login = require('./routes/login');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/erp',{promiseLibrary: require('bluebird')})
            .then(()=>{
                console.log('Conexión a la DB Ok');
            })
            .catch((err)=>{
                console.error('Error de conexión', err)
            })

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended': 'false'}));

app.use('/proveedor', proveedor);
app.use('/factura', factura);
app.use('/cliente', cliente);
app.use('/presupuesto', presupuesto);
app.use('/usuario', usuario);
app.use('/login', login);

app.listen(3000, function(){
    console.log('Servidor Ok en el puerto 3000');
})