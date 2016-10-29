var fs = require('fs');
var rootDir = process.cwd();
var imgfile = rootDir + '/images/southpark.jpg';
var img = fs.readFileSync(imgfile,'binary');
var enviar = function(res) {
	res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(img,'binary');
}

exports.file = imgfile;
exports.img = img;
exports.enviar = enviar;