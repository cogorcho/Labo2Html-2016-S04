var fs = require('fs');
var rootDir = process.cwd();
var indexfile = rootDir + '/index.html';
var index = fs.readFileSync(indexfile,'utf8');

var enviar = function(res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
}

exports.file = indexfile;
exports.enviar = enviar