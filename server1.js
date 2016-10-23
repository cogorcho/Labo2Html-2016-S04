var http = require('http');
var fs = require('fs');
var url = require("url");
var index = fs.readFileSync('index.html','utf8');

var categorias = require('./modulos/categorias.js');
var areas = require('./modulos/areas.js');
var preguntas = require('./modulos/preguntas.js');
var respuestas = require('./modulos/respuestas.js');
var codigoq = require('./modulos/codigoq.js');
var js = require('./modulos/js.js');
var css = require('./modulos/css.js');


http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;

  switch (pathname) {
      case '/' : {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(index); 
        break;
      }
      case '/categorias' : {
        categorias.enviar(res); break;
      }
      case '/areas' : {
        areas.enviar(res); break;
      }
      case '/preguntas' : {
        preguntas.enviar(res); break;
      }
      case '/respuestas' : {
        respuestas.enviar(res); break;
      }
      case '/codigoq' : {
        codigoq.enviar(res); break;
      }
      case '/js/datos.js' : {
        js.enviar(res); break;
      }
      case '/css/estilos.css' : {
        css.enviar(res); break;
      }
      default : { 
        console.log('Recibido: ' + pathname + '. Requerimiento invalido');
        res.end();
        break;
      }
  }
}).listen(9615);
console.log('Server started');


