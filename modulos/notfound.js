var fs = require('fs');
var rootDir = process.cwd();
var notfoundfile = rootDir + '/notfound.html';
var notfound = fs.readFileSync(notfoundfile,'utf8');

var enviar = function(res) {
	res.writeHead(404, {'Content-Type': 'text/html'});
    res.end(notfound);
}

exports.file = notfoundfile;
exports.enviar = enviar