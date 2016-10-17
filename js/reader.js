fs = require('fs')
fs.readFile('./data/Preguntas/todas.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var datos = JSON.parse(data);
    var cuantos = datos.length;
    for (var i = 0; i < cuantos; i++) {
        var strid = "" +
                datos[i].tpid + 
                datos[i].catid +
                datos[i].preguntaid;
        console.log(strid);
    }
    console.log(datos.length);
});