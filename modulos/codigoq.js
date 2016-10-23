var fs = require('fs');
var rootDir = process.cwd();
var codigoqfile = rootDir + '/js/data/codigoq.json';
var codigoq = fs.readFileSync(codigoqfile,'utf8');
var data = JSON.parse(codigoq);
var enviar = function(res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(codigoq);
}

exports.file = codigoqfile;
exports.data = data;
exports.cuantos = data.length;
exports.enviar = enviar;