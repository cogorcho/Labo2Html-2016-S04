var fs = require('fs');
var rootDir = process.cwd();
var areasfile = rootDir + '/js/data/areas.json';
var areas = fs.readFileSync(areasfile,'utf8');
var data = JSON.parse(areas);

var enviar = function(res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(areas);
}

exports.file = areasfile;
exports.data = data;
exports.cuantos = data.length;
exports.enviar = enviar
