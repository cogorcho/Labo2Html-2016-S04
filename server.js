var http = require('http');
var router = require('./modulos/router.js');

http.createServer(
	router.route
).listen(9615);

console.log('Server started');