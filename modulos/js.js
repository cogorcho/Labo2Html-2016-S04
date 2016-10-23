var fs = require('fs');
var rootDir = process.cwd();
var scriptfile = rootDir + '/js/datos.js';
var js = fs.readFileSync(scriptfile,'utf8');
var enviar = function(res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(js);
}

exports.file = scriptfile;
exports.js = js;
exports.enviar = enviar;