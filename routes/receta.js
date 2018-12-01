var express = require('express');
var router = express.Router();

var RECETA =require('.././database/recetas');
var ALIMENTO =require('.././database/alimentos');

router.post('/rect', (req, res)=>{
  ALIMENTO.findById(req.body.ingredientes);
  var receta1 ={
    nombre : req.body.nombre,
    instrucciones : req.body.instrucciones,
    porciones : req.body.porciones,
    tipo : req.body.tipo,
    ingredientes : req.body.ingredientes
  }
  var datareceta = new RECETA(receta1);
  datareceta.save().then((resultado)=>{
    res.status(200).json("agrego con exito la receta");
    console.log(resultado);
  })
});

router.get('/rect', (req, res)=>{
  RECETA.find().populate('ingredientes').exec((error, docs)=>{
    res.status(200).json(docs);
  });
});

router.patch('/rect/:id', function (req, res, next) {
    var idRe= req.params.id;
    const datosRe = {};
    Object.keys(req.body).forEach((key) => {
        datosRe[key] = req.body[key];
    });
    RECETA.findByIdAndUpdate(idRe, datosRe).exec().then(result => {
      res.status(200).json("Datos actualizados");
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/rect/:id', function (req, res, next) {
    var idRe = req.params.id;
    RECETA.findByIdAndRemove(idRe).exec().then(() => {
            res.status(200).json("receta eliminada");
    }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
});
           /*ALIMENTOS*/

router.post('/alime', (req, res)=>{
  var alimento1 ={
    nombre : req.body.nombre,
    calorias : req.body.calorias,
    hidratosCa : req.body.hidratos,
    proteinas : req.body.proteinas,
    grasas : req.body.grasas,
    fibra: req.body.fibra
  };
  var dataAli = new ALIMENTO(alimento1);
  dataAli.save().then((info) =>{
    res.status(200).json(info);
  })
});

router.get('/alime', (req, res)=>{
  ALIMENTO.find({}).exec((error, docs)=>{
    res.status(200).json(docs);
  })
});
router.patch('/alime/:id', function (req, res, next) {
    var idAli= req.params.id;
    const datosAli = {};
    Object.keys(req.body).forEach((key) => {
        datosAli[key] = req.body[key];
    });
    ALIMENTO.findByIdAndUpdate(idAli, datosAli).exec().then(result => {
      res.status(200).json("Datos actualizados");
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/alime/:id', function (req, res, next) {
    var idAli = req.params.id;
    ALIMENTO.findByIdAndRemove(idAli).exec().then(() => {
            res.status(200).json("receta eliminada");
    }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
});

router.get(/alime\/[a-z0-9]{1,}$/, (req, res) =>{
  var url = req.url;
  var idA = url.split('/')[2];
  ALIMENTO.findOne({_id : idA}).exec((err, docs)=>{
    res.status(200).json(docs);
  })
});

module.exports = router;
