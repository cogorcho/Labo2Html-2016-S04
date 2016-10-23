var fs = require('fs');
var rootDir = process.cwd();
var cssfile = rootDir + '/css/estilos.css';
var css = fs.readFileSync(cssfile,'utf8');
var enviar = function(res) {
	res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(css);
}

exports.file = cssfile;
exports.css = css;
exports.enviar = enviar;