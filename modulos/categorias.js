var fs = require('fs');
var http = require('http');

var rootDir = process.cwd();
var catsfile = rootDir + '/js/data/categorias.json';
var categorias = fs.readFileSync(catsfile,'utf8');
var data = JSON.parse(categorias);

var enviar = function(res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(categorias);
}

exports.file = catsfile;
exports.data = data;
exports.cuantos = data.length;
exports.enviar = enviar;