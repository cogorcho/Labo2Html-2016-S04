//-----------------------------------------------------------
// No hay manejo de errores. Eso hay q agregarlo!
//-----------------------------------------------------------

var cuenta = 0;


//--------------------------------------------------------------------
//Evento click al menu, para agarrar los clicks sobre los links
// la funcion linkeada al evento hace el ajax solo para lo q
// se clickeo.
//--------------------------------------------------------------------
// var menu = document.getElementById('menu');
// menu.addEventListener('click', menuClicked);

// function menuClicked(ev) {
//     ajax(ev.srcElement.name);
// }

var datos = [
    { clave: 'CATE', valor: 'categorias' },
    { clave: 'AREA', valor: 'areas' },
    { clave: 'PREG', valor: 'preguntas' },
    { clave: 'RESP', valor: 'respuestas' },
    { clave: 'CODQ', valor: 'codigoq' }
];

var categoriaSeleccionada = undefined;
var areaSeleccionada = undefined;

//--------------------------------------------------------------------
// Cargar local storage con toda la data
//--------------------------------------------------------------------
function cargarLocalStorage() {
    localStorage.clear();

    var cuantosDatos = datos.length;

    for (var i = 0; i < cuantosDatos; i++) {
        ajax(datos[i]);
    }
}

//--------------------------------------------------------------------
// Ajax, esta funcion va al server y trae la data en json
//--------------------------------------------------------------------
function ajax(target) {
    // Definimos la URL que vamos a solicitar via ajax
    var ajax_url = "http://localhost:9615/" + target.valor;

    // Creamos un nuevo objeto encargado de la comunicación
    var ajax_request = new XMLHttpRequest();
    ajax_request.addEventListener("loadend", controlCarga);

    // Definimos una función a ejecutar cuándo la solicitud Ajax tiene alguna información
    ajax_request.onreadystatechange = function() {
        // readyState es 4
        if (ajax_request.readyState == 4 ) {
            if (ajax_request.status === 200) {
                // Analizamos el responseText que contendrá el JSON enviado 
                // desde el servidor
                var jsonObj = JSON.parse( ajax_request.responseText );
                // La variable jsonObj ahora contiene un objeto con los datos 
                // recibidos
                //-----------------------------------------------------------
                // La data q vino del server, se guarda en localStorage
                //-----------------------------------------------------------
                localstore(target, jsonObj);
            } 
        }
    }

    // Definimos como queremos realizar la comunicación
    ajax_request.open( "GET", ajax_url, true );

    //Enviamos la solicitud
    ajax_request.send();
}

//--------------------------------------------------------------------
// Guarda en localStorage. 1ro arma la key en funcion de q data
// esta procesando
//--------------------------------------------------------------------
function localstore(target, data) {

    var cuantos = data.length;
    switch (target.valor) {
        case 'categorias' : {
            for (var i = 0; i < cuantos; i++) {
                var key = target.clave + data[i].id;

                if (localStorage.getItem(key) === null) {
                    localStorage.removeItem(key);
                }
                localStorage.setItem(key, JSON.stringify(data[i]));
            }
            break;
        }
        case 'areas'      : {
            for (var i = 0; i < cuantos; i++) {
                var key = target.clave + data[i].id;

                if (localStorage.getItem(key) === null) {
                    localStorage.removeItem(key);
                }
                localStorage.setItem(key, JSON.stringify(data[i]));
            }
            break;
        }
        case 'preguntas'  : {
            for (var i = 0; i < cuantos; i++) {
                var key = target.clave + data[i].catid + data[i].areaid + data[i].preguntaid;

                if (localStorage.getItem(key) === null) {
                    localStorage.removeItem(key);
                }
                localStorage.setItem(key, JSON.stringify(data[i]));
            }
            break;

        }
        case 'respuestas' : {
            for (var i = 0; i < cuantos; i++) {
                var key = target.clave + data[i].catid + data[i].areaid 
                                 + data[i].preguntaid + data[i].respuestaid;

                if (localStorage.getItem(key) === null) {
                    localStorage.removeItem(key);
                }
                localStorage.setItem(key, JSON.stringify(data[i]));
            }
            break;
        }
        case 'codigoq' : {
            for (var i = 0; i < cuantos; i++) {
                var key = target.clave + data[i].codigo;

                if (localStorage.getItem(key) === null) {
                    localStorage.removeItem(key);
                }
                localStorage.setItem(key, JSON.stringify(data[i]));
            }
            break;
        }
    }
}

//-------------------------------------------------------------------
// Traemos todo del server
//-------------------------------------------------------------------
cargarLocalStorage();


//-------------------------------------------------------------------
// Ya deberia estar todo en el cliente cargado.
// Parseamos las keys para tener la data y poder usarla.
//-------------------------------------------------------------------
function controlCarga() {
    cuenta = cuenta + 1; 
    if (cuenta == datos.length)
    {
        cargarData();
    }
}


function cargarData() {
    var keys = Object.keys(localStorage);
    var cuantasKeys = keys.length;
    var categorias = [];
    var areas = [];
    var preguntas = [];
    var respuestas = [];
    var codigoq = [];


    for (var i = 0; i < cuantasKeys; i++) {
        if (keys[i].search("CATE") === 0) {
            categorias.push(JSON.parse(localStorage.getItem(keys[i])));
        }    
        if (keys[i].search("AREA") === 0) {
            areas.push(JSON.parse(localStorage.getItem(keys[i])));
        }    
        if (keys[i].search("PREG") === 0) {
            preguntas.push(JSON.parse(localStorage.getItem(keys[i])));
        }    
        if (keys[i].search("RESP") === 0) {
            respuestas.push(JSON.parse(localStorage.getItem(keys[i])));
        }  
        if (keys[i].search("CODQ") === 0) {
            codigoq.push(JSON.parse(localStorage.getItem(keys[i])));
        }    
    }

    armarRB({id: 'categoria', legend: 'Categorias', data: categorias});
    armarRB({id: 'area', legend: 'Areas', data: areas});
    armarBoton();
}


function armarRB(objData) {
    var cuantas = objData.data.length;
    var nav = document.getElementById('menu');
    var fset = document.createElement('fieldset');

    var legend = document.createElement('legend');
    legend.innerHTML = objData.legend;
    fset.appendChild(legend);

    for (var i = 0; i < cuantas; i++) {
        var rb = document.createElement('input');
        var lb = document.createElement('label');
        lb.setAttribute("for", rb);
        lb.innerHTML = objData.data[i].descripcion;
        fset.appendChild(lb);
        rb.type = 'radio';
        rb.name = objData.id;
        rb.id = objData.data[i].descripcion;
        rb.value = objData.data[i].id;
        fset.appendChild(rb);
    }
    nav.appendChild(fset);
    fset.addEventListener('click', clickRB);
}

function clickRB(ev) {
    var src = ev.srcElement;
    var rb = {
        type : src.name,
        id : src.id,
        value : src.value
    };

    if (rb.type === 'categoria')
        categoriaSeleccionada = rb;
    if (rb.type === 'area')
        areaSeleccionada = rb;
}

function armarBoton() {
    var nav = document.getElementById('menu');
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.id = 'btnCarga';
    btn.name = 'btnCarga'; 
    btn.value = 'Traer datos';   
    nav.appendChild(btn); 

    btn.addEventListener('click', armarTabla);   
}

function armarTabla(ev) {
    if (categoriaSeleccionada === undefined) {
        alert('Seleccione una categoria');
        return;
    }
    if (areaSeleccionada === undefined) {
        alert('Seleccione un area');
        return;
    }

    var preguntas = filterPreguntas('PREG', categoriaSeleccionada.value, areaSeleccionada.value);
    var cuantas = preguntas.length;

    var tabla = document.createElement('table');
    var encabezado, cuerpo, fila, pregid, texto, correcta;

    encabezado = tabla.createTHead();
    fila = encabezado.insertRow(0); 
    pregid = fila.insertCell(0);
    texto = fila.insertCell(1);
    correcta = fila.insertCell(2);
    pregid.innerHTML = 'Nro';
    texto.innerHTML = 'Pregunta';
    correcta.innerHTML = 'Ok?';
    
    cuerpo = tabla.createTBody();
    for(var i = 0; i < cuantas; i++) {
        fila = cuerpo.insertRow(0); 
        pregid = fila.insertCell(0);
        texto = fila.insertCell(1);
        correcta = fila.insertCell(2);
        pregid.innerHTML = preguntas[i].preguntaid;
        texto.innerHTML = preguntas[i].texto;
        correcta.innerHTML = preguntas[i].correcta;
    }
    document.getElementById("principal").appendChild(tabla);

    tabla.addEventListener('click', rowSelected);
}

function filterPreguntas(que, categoria, area) {
    var keys = Object.keys(localStorage);
    var cuantas = keys.length;
    var buscar = que + categoria + area;
    var lista = [];
    for(var i = 0; i < cuantas; i++) {
        if (keys[i].substring(0,6) == buscar) {
            lista.push(JSON.parse(localStorage.getItem(keys[i])));
        }
    }
    lista.sort(compare);
    return lista;
}

function compare(a,b) {
    if (parseInt(a.preguntaid) < parseInt(b.preguntaid))
        return 1;
    if (parseInt(a.preguntaid) > parseInt(b.preguntaid))
        return -1;
    return 0;
}

function filterRespuesta(que, categoria, area, preguntaid) {
    var keys = Object.keys(localStorage);
    var cuantas = keys.length;
    var buscar = que + categoria + area + preguntaid;
    var lista = [];
    for(var i = 0; i < cuantas; i++) {
        if (keys[i].slice(0,-1) == buscar) {
            lista.push(JSON.parse(localStorage.getItem(keys[i])));
        }
    }
    return lista;
}


function rowSelected(ev) {
    var fila = ev.srcElement.parentElement;
    var obj = {}
    obj.preguntaid = fila.childNodes[0].innerHTML;
    obj.texto = fila.childNodes[1].innerHTML;
    obj.correcta = fila.childNodes[2].innerHTML;

    var cq =  obj.preguntaid + ": " + obj.texto + "(" + obj.correcta + ")\n";
    var resps = filterRespuesta('RESP', categoriaSeleccionada.value, areaSeleccionada.value, obj.preguntaid)

    alert(cq + strRespuestas(resps));

    var data = {
        nro : obj.preguntaid,
        texto : obj.texto,
        correcta : obj.correcta,
        respuestas : resps
    }
    alert(data.toString());
    popup(data);
}

function strRespuestas(resps) {
    var cuantas = resps.length;
    var cr = "";
    for (var i = 0; i < cuantas; i++) {
        cr += resps[i].respuestaid + ': ' + resps[i].texto + "\n";
    }
    return cr;
}

function popup(data) {
    var div = document.createElement('div');
    var h4 = document.createElement('h4');
    h4.textContent = data.nro + ': ' + data.texto;
    div.appendChild(h4);
    var hr = document.createElement('hr');
    div.appendChild(hr);

    var cuantas = data.respuestas.length;

    for (var i = 0; i < cuantas; i++) {
        var rb = document.createElement('input');
        var lb = document.createElement('label');
        lb.setAttribute("for", rb);
        lb.innerHTML = data.respuestas[i].texto;
        div.appendChild(lb);
        rb.type = 'radio';
        rb.name = 'respuestas';
        rb.id = data.respuestas[i].respuestaid;
        rb.value = data.respuestas[i].texto;
        div.appendChild(rb);
    }

    div.addEventListener('click', clickRB);
    console.dir(div);

}



