var express = require('express');
var router = express.Router();

var CLIENTE =require('.././database/clientes');
var PEDIDO =require('.././database/pedidos');
var PRODUCTO =require('.././database/productos');
var CALCULAR = require('.././database/calcular');
        /*CLIENTESSSSSSSSSSSSS*/
router.post('/clien', (req, res)=>{
  var cliente1 ={
    nombre : req.body.nombre,
    ci : req.body.ci,
    saldo : req.body.saldo,
    fechaRegistro : new Date()
  }
  var datacliente = new CLIENTE(cliente1);
  datacliente.save().then((resultado)=>{
    res.status(200).json(resultado);
  })
});

router.get('/clien', (req, res)=>{
  CLIENTE.find({}).exec((error, docs)=>{
    res.status(200).json(docs);
  });
});
router.patch('/clien/:id', function (req, res, next) {
    var idCli= req.params.id;
    const datosCli = {};
    Object.keys(req.body).forEach((key) => {
        datosCli[key] = req.body[key];
    });
    CLIENTE.findByIdAndUpdate(idCli, datosCli).exec().then(result => {
      res.status(200).json("Datos actualizados");
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/clien/:id', function (req, res, next) {
    var idCli = req.params.id;
    CLIENTE.findByIdAndRemove(idCli).exec().then(() => {
            res.status(200).json("receta eliminada");
    }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
});
router.get(/clien\/[a-z0-9]{1,}$/, (req, res) =>{
  var url = req.url;
  var idCl = url.split('/')[2];
  CLIENTE.findOne({_id : idCl}).exec((err, docs)=>{
    res.status(200).json(docs);
  })
});


/*PRODUCTOSSSSSSSSSSSSSSSSSSSSSSSSSSS*/
router.post('/prod', (req, res)=>{
  var producto1 ={
    nombre : req.body.nombre,
    descripcion : req.body.descripcion,
    precio : req.body.precio,
    stock : req.body.stock
  }
  var dataproducto = new PRODUCTO(producto1);
  dataproducto.save().then((resultado)=>{
    res.status(200).json(resultado);
  })
});

router.get(/prod\/[a-z0-9]{1,}$/, (req, res) =>{
  var url = req.url;
  var idPr = url.split('/')[2];
  PRODUCTO.findOne({_id : idPr}).exec((err, docs)=>{
    console.log(docs.stock);
    res.status(200).json(docs);
  })
});
router.get('/prod', (req, res)=>{
  PRODUCTO.find().then((result) =>{
    var productos = result.map((doc) =>{
        return ({
          ver: 'http://localhost:8080/ventas/prod/' + doc._id,
          nombre : doc.nombre,
          precio : doc.precio,
          stock : doc.stock,
          comprar: {
            url: 'http://localhost:8080/ventas/addPedid/' + doc._id
          }

        });
      })
    res.status(200).json(productos);
  })
});
router.patch('/prod/:id', function (req, res, next) {
    var idPro= req.params.id;
    const datospro = {};
    Object.keys(req.body).forEach((key) => {
        datospro[key] = req.body[key];
    });
    PRODUCTO.findByIdAndUpdate(idPro, datospro).exec().then(result => {
      res.status(200).json("Datos actualizados");
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/prod/:id', function (req, res, next) {
    var idpro = req.params.id;
    PRODUCTO.findByIdAndRemove(idpro).exec().then(() => {
            res.status(200).json("receta eliminada");
    }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
});
/*ORDENAR*/
router.get('/addPedid/:id', function(req, res, next) {
   var productId = req.params.id;
   var calcular = new CALCULAR(req.session.cal ? req.session.cal : {});
   PRODUCTO.findById(productId, function(err, product) {
       if(err) {
         res.status(404).json({
        message: "Producto no existe en la bd"
      });
      return;
       }
        calcular.add(product, product.id);
        req.session.cal = calcular;
        res.status(200).json({
          mensaje: "agrego con exito  "+productId+ "  a sus pedidos"
        });
   });
});

router.get('/pedid', (req, res)=>{
  PEDIDO.find({}).populate('cliente').exec().then(docs =>{
    res.status(200).json(docs);
  });
});
router.patch('/pedid/:id', function (req, res, next) {
    var idped= req.params.id;
    const datosped = {};
    Object.keys(req.body).forEach((key) => {
        datosped[key] = req.body[key];
    });
    PEDIDO.findByIdAndUpdate(idped, datosped).exec().then(result => {
      res.status(200).json("Datos actualizados");
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/pedid/:id', function (req, res, next) {
    var idped = req.params.id;
    PEDIDO.findByIdAndRemove(idped).exec().then(() => {
            res.status(200).json("receta eliminada");
    }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
});
router.post('/pedid', function(req, res, next) {
    if (!req.session.cal) {
        return (res.status(404).json("no agredado los productos para su compra"));

    }
    CLIENTE.findById(req.body.cliente);
    var calcular = new CALCULAR(req.session.cal);
        var order = new PEDIDO({
            descripcion : req.body.descripcion,
            fechaEntrega : new Date(),
            entregado : false,
            costoTotal : calcular.precioTotal,
            cliente :req.body.cliente,
            producto :  calcular
        });
        order.save(function(err, result) {
          res.status(200).json({
            msm: "se envio con exito su pedido"
          });
        });
        delete req.session.cal;
    });


module.exports = router;
