var mongoose = require('./connect');
var alimentoSchema ={
  nombre : {type:String, required:[true, 'falta el nombre']},
  calorias :{type: Number, required:[true, 'falta las calorias']},
  hidratosCa :{type: Number, required:[true, 'falta los hodratos']},
  proteinas : {type: Number, required:[true, 'falta las proteinas']},
  grasas : {type: Number, required:[true, 'falta las grasas']},
  fibra: {type: Number, required:[true, 'falta las fibras']}
};

var alimento = mongoose.model('alimento', alimentoSchema);
module.exports = alimento;
