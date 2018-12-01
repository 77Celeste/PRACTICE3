var mongoose = require('./connect');
var Schema = mongoose.Schema;
var recetaSchema = Schema({
  nombre : {type: String, required:[true, 'falta el nombre']},
  instrucciones : {type: String, required:[true, 'falta las instrucciones']},
  porciones : {type: Number, required:[true, 'falta las porciones']},
  tipo : {type: String, required:[true, 'falta el tipo de receta']},
  ingredientes : [{type: Schema.Types.ObjectId, ref: "alimento"}]
});
var receta = mongoose.model('receta', recetaSchema);
module.exports = receta;
