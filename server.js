var http = require('http');
var fs = require('fs');
var url = require("url");
var index = fs.readFileSync('index.html');

var categorias = {};
var areas = {};
var preguntas = {};
var respuestas = {};
var codigoq = {};

var js = "";
var css = "";

//Leer js
fs.readFile('./js/datos.js', 'utf8', function (err,data) {
    if (err) {
        js = err;
    }
    js = data;
});

//Leer css
fs.readFile('./css/estilos.css', 'utf8', function (err,data) {
    if (err) {
        css = err;
    }
    css = data;
});

//Leer categorias
fs.readFile('./js/data/categorias.json', 'utf8', function (err,data) {
    if (err) {
        categorias = err;
    }
    categorias = JSON.parse(data);
});

//Leer Areas
fs.readFile('./js/data/areas.json', 'utf8', function (err,data) {
    if (err) {
        preguntas = err;
    }
    areas = JSON.parse(data);
});

//Leer preguntas
fs.readFile('./js/data/Preguntas/todas.json', 'utf8', function (err,data) {
    if (err) {
        preguntas = err;
    }
    preguntas = JSON.parse(data);
});

//Leer respuestas
fs.readFile('./js/data/Respuestas/todas.json', 'utf8', function (err,data) {
    if (err) {
        respuestas = err;
    }
    respuestas = JSON.parse(data);
});

//Leer codigoq
fs.readFile('./js/data/codigoq.json', 'utf8', function (err,data) {
    if (err) {
        codigoq = err;
    }
    codigoq = JSON.parse(data);
});

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;

  switch (pathname) {
      case '/' : {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(index); 
        break;
      }
      case '/categorias' : {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(categorias)); break;
      }
      case '/areas' : {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(areas)); 
        break;
      }
      case '/preguntas' : {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(preguntas)); 
        break;
      }
      case '/respuestas' : {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(respuestas)); 
        break;
      }
      case '/codigoq' : {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(codigoq)); 
        break;
      }
      case '/js/datos.js' : {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(js); 
        break;
      }
      case '/css/estilos.css' : {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(css); 
        break;
      }
      default : { 
        res.end();
        break;
      }
  }
}).listen(9615);
console.log('Server started');


