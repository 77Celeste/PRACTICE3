var express = require('express');
var router = express.Router();


/* GET users listing. */

router.get('/servicio', function(req, res, next) {
  var  baseUrl = req.baseUrl;
  var host=  req.hostname;
  var originalUrl = req.originalUrl;
  var httpVersion= req.httpVersion;
  var _startTime = req._startTime;
  var data = {
  baseUrl,
  host,
  originalUrl,
  httpVersion,
  _startTime
  }
  console.log(data._startTime);
  res.status(200).json(data);
});
/*I= interes_ganado (anual/mensual/semanal/dias); C=capital (monto_inicial);
r= porcentaje t= anio/mes/semana/dias
I = (C*r*t)/100
monto_final= C + I*/

router.post('/intereses', (req, res)=>{
  var monto_inicial = req.body.inicial;
  var porcentaje_anual = req.body.porcentaje;
  var anios = 1;
  var meses = 12;
  var semanas = 52;
  var dias = 365;

  var anual = (Number(monto_inicial)*Number(porcentaje_anual)*Number(anios))/(Number(anios)*100);
  var mensual = (Number(monto_inicial)*Number(porcentaje_anual)*Number(anios))/(Number(meses)*100);
  var semanal= (Number(monto_inicial)*Number(porcentaje_anual)*Number(anios))/(Number(semanas)*100);
  var diario = (Number(monto_inicial)*Number(porcentaje_anual)*Number(anios))/(Number(dias)*100);

  var monto_final = Number(monto_inicial) + Number(anual);
  var interes_ganado ={
     anual,
     mensual,
     semanal,
     diario
  };
   var data ={
     monto_inicial,
     porcentaje_anual,
     monto_final,
     interes_ganado
   }
   res.status(200).json(data);
});

module.exports = router;
