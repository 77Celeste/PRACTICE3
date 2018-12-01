var mongoose = require('./connect');
var clienteSchema ={
  nombre : {type: String, required:[true, 'falta el nombre']},
  ci : {type: String, required:[true, 'falta ci']},
  saldo : {type: Number, required:[true, 'falta su saldo']},
  fechaRegistro : Date
};

var cliente = mongoose.model('cliente', clienteSchema);
module.exports = cliente;
