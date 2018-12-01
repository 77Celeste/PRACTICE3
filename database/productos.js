var mongoose = require('./connect');
var productoSchema ={
  nombre : {type: String, required:[true, 'falta el nombre']},
  descripcion : {type: String, required:[true, 'falta la descripcion']},
  precio : {type: Number, required:[true, 'falta el precio']},
  stock : {type: Number, required:[true, 'falta la cantidad']}
};

var producto = mongoose.model('producto', productoSchema);

module.exports = producto;
