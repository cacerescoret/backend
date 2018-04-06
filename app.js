var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');

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

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended': 'false'}));

app.use('/proveedor', proveedor);

app.listen(3000, function(){
    console.log('Servidor Ok en el puerto 3000');
})