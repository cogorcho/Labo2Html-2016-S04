var fs = require('fs');
var rootDir = process.cwd();
var preguntasfile = rootDir + '/js/data/Preguntas/todas.json';
var preguntas = fs.readFileSync(preguntasfile,'utf8');
var data = JSON.parse(preguntas);
var enviar = function(res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(preguntas);
}

exports.file = preguntasfile;
exports.data = data;
exports.cuantos = data.length;
exports.enviar = enviar;