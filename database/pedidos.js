var mongoose = require('./connect');
const Schema = mongoose.Schema
var pedidoSchema =Schema({
  descripcion : {type: String, required:[true, 'falta la descripcion']},
  fechaRegistro : {type: Date, default: Date.now()},
  fechaEntrega : Date,
  entregado :Boolean,
  costoTotal : Number,
  cliente : {type:Schema.Types.ObjectId, ref:"cliente"},
  producto : [{type: Object, required: true}]
});

var pedido = mongoose.model('pedido', pedidoSchema);
module.exports = pedido;
