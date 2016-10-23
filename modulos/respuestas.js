var fs = require('fs');
var rootDir = process.cwd();
var respuestasfile = rootDir + '/js/data/Respuestas/todas.json';
var respuestas = fs.readFileSync(respuestasfile,'utf8');
var data = JSON.parse(respuestas);
var enviar = function(res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(respuestas);
}

exports.file = respuestasfile;
exports.data = data;
exports.cuantos = data.length;
exports.enviar = enviar;