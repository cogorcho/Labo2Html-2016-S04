//-----------------------------------------------------------
// No hay manejo de errores. Eso hay q agregarlo!
//-----------------------------------------------------------

var cuenta = 0;
var preguntasExamen = 15;
var examen = [];

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

/*------------------------------------------
    Esto reemplaza arrays locales q use.
    Preguntas y respuestas no serian
    necesarias. A revisar
--------------------------------------------*/
var listas = {
    CATE : { data: [], length: 0 },
    AREA : { data: [], length: 0 },
    PREG : { data: [], length: 0 },
    RESP : { data: [], length: 0 },
    CODQ : { data: [], length: 0 }
};

var categoriaSeleccionada = undefined;
var areaSeleccionada = undefined;
var dataIsLocal = false; 
/*----------------------------------------
    Una vez q se hace el ajas y se trae
    la data al localStorage, se setea a
    true. Aunque aun no la estoy usando.
------------------------------------------*/
var dataIsLocal = false; 

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
    var ajax_url = "./"+target.valor;//"http://localhost:9615/" + target.valor;

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

//--------------------------------------------------------------------
// Guarda en localStorage. 1ro arma la key en funcion de q data
// esta procesando
//--------------------------------------------------------------------
function localstore(target, data) {
    console.log('Vamo al server');
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
    dataIsLocal = true;
}

/*-------------------------------------------------------------------
    Llamada a la funcion q Trae todo del server
--------------------------------------------------------------------*/
if (!dataIsLocal) {
    cargarLocalStorage();    
}

/*-------------------------------------------------------------------
    Traemos todo del server
--------------------------------------------------------------------*/
function cargarData() {
    var keys = Object.keys(localStorage);
    var cuantasKeys = keys.length;

    for (var i = 0; i < cuantasKeys; i++) {
        if (keys[i].search("CATE") === 0) {
            listas.CATE.data.push(JSON.parse(localStorage.getItem(keys[i])));
        }    
        if (keys[i].search("AREA") === 0) {
            listas.AREA.data.push(JSON.parse(localStorage.getItem(keys[i])));
        }    
        if (keys[i].search("PREG") === 0) {
            listas.PREG.data.push(JSON.parse(localStorage.getItem(keys[i])));
        }    
        if (keys[i].search("RESP") === 0) {
            listas.RESP.data.push(JSON.parse(localStorage.getItem(keys[i])));
        }  
        if (keys[i].search("CODQ") === 0) {
            listas.CODQ.data.push(JSON.parse(localStorage.getItem(keys[i])));
        }    
    }

    listas.CATE.length = listas.CATE.data.length;
    listas.AREA.length = listas.AREA.data.length;
    listas.PREG.length = listas.PREG.data.length;
    listas.RESP.length = listas.RESP.data.length;
    listas.CODQ.length = listas.CODQ.data.length;

    armarRB({id: 'categoria', legend: 'Categorias', data: listas.CATE.data});
    armarRB({id: 'area', legend: 'Areas', data: listas.AREA.data});
    armarBoton();
}

/*-----------------------------------------------
    Arma los radio button para seleccion
    Area y Categoria
-------------------------------------------------*/
function armarRB(objData) {
    var cuantas = objData.data.length;
    var nav = document.getElementById('menu');
    var fset = document.createElement('fieldset');
    fset.className = 'fset';

    var legend = document.createElement('legend');
    legend.className = 'legend';
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

/*-----------------------------------------------
    Cada click en los RB, se guarda
-------------------------------------------------*/
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

/*--------------------------------------
    Arma el boton para seleccionar data
----------------------------------------*/
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

/*----------------------------------------------
    Con la seleccion (area y categoria) hecha
    armamos la tabla con las preguntas
-----------------------------------------------*/
function armarTabla(ev) {
    if (categoriaSeleccionada === undefined) {
        alert('Seleccione una categoria');
        return;
    }
    if (areaSeleccionada === undefined) {
        alert('Seleccione un area');
        return;
    }

    /*
        Esto es mejorable. Si area y categoria no
        cambiaron, se podria dejar todo como esta.
        Pero, si algo cambio, la tabla de vuelve
        a crear.
    */
    var yaExiste = document.getElementById('tabla');
    if (yaExiste!=null) {
        yaExiste.parentNode.removeChild(yaExiste);
    }

    var preguntas = filterPreguntas('PREG', categoriaSeleccionada.value, areaSeleccionada.value);
    var cuantas = preguntas.length;

    var tabla = document.createElement('table');
    tabla.id = 'tabla';
    var encabezado, cuerpo, fila, pregid, texto, correcta;

    encabezado = tabla.createTHead();
    fila = encabezado.insertRow(0); 
    pregid = fila.insertCell(0);
    texto = fila.insertCell(1);
    fila.id = "encabezado";
    pregid.innerHTML = 'Nro';
    texto.innerHTML = 'Pregunta';
    
    cuerpo = tabla.createTBody();
    for(var i = 0; i < cuantas; i++) {
        fila = cuerpo.insertRow(0); 
        pregid = fila.insertCell(0);
        texto = fila.insertCell(1);
        pregid.innerHTML = preguntas[i].preguntaid;
        texto.innerHTML = preguntas[i].texto;
        var respcorrecta = document.createAttribute("data-correcta");
        respcorrecta.value = preguntas[i].correcta;
        fila.setAttributeNode(respcorrecta);
        fila.id = "id"+pregid;
    }
    document.getElementById("principal").appendChild(tabla);

    tabla.addEventListener('click', rowSelected);
}
/*---------------------------------------------------------
    Filtrar las preguntas para la categoria y area
    seleccionadas. La data se busca en el localStorage.
    El algoritmo es medio basico, pero se la banca.
    Da para q se estudie y se entienda, pero solo busca
    un juego de caracteres en un string (q es la Key).
-----------------------------------------------------------*/
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

/*-------------------------------------------------
    Funcion para ordenar las preguntas por numero.
    Como todo se guarda como strings, el sort
    lo hace mal (1,10,100,101,11,110,111,12...)
---------------------------------------------------*/
function compare(a,b) {
    if (parseInt(a.preguntaid) < parseInt(b.preguntaid))
        return 1;
    if (parseInt(a.preguntaid) > parseInt(b.preguntaid))
        return -1;
    return 0;
}

/*-------------------------------------------------------------
    Filtrar las respuestas para la categoria, area y pregunta
    seleccionadas. La data se busca en el localStorage.
    Es lo mismo q con las preguntas, pero en este caso,
    no hace falta el sort ya q las respuestas son ABCD
--------------------------------------------------------------*/
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

/*-------------------------------------------------------------
    Captura el click sobre las filas de la tabla
---------------------------------------------------------------*/
function rowSelected(ev) {
    ev.preventDefault();
    var fila = ev.srcElement.parentElement;
    var correcta = fila.dataset.correcta;

    if (fila.childNodes.length<2) return;
    if (fila.id.indexOf("id")!=0) return;
    
    var obj = {}
    obj.preguntaid = fila.childNodes[0].innerHTML;
    obj.texto = fila.childNodes[1].innerHTML;
    obj.correcta = fila.dataset.correcta;


    var cq =  obj.preguntaid + ": " + obj.texto + "(" + obj.correcta + ")\n";
    var resps = filterRespuesta('RESP', categoriaSeleccionada.value, areaSeleccionada.value, obj.preguntaid)

    var data = {
        nro : obj.preguntaid,
        texto : obj.texto,
        correcta : obj.correcta,
        respuestas : resps
    }
    popup(data);
}

/*------------------------------------------------------------
    Cuando se hace click sobre una pregunta, se muestra
    un popup con las respuestas y capturar entrada del
    usuario.
---------------------------------------------------------------*/
function popup(data) {
    var div0 = document.createElement('div');
    div0.id = 'text';
    div0.className = 'lightbox';
    document.body.appendChild(div0);
    
    var div1 = document.createElement('div');
    div1.className = 'box';

        var pregunta = document.createElement('p');
        pregunta.className = 'title';
        pregunta.textContent = data.nro + ': ' + data.texto;
        div1.appendChild(pregunta);

        var respuestas = document.createElement('div');
        respuestas.className = 'content';
        var cuantas = data.respuestas.length;
        for (var i = 0; i < cuantas; i++) {
            var rb = document.createElement('input');
            var lb = document.createElement('label');
            var br = document.createElement('br');
            lb.setAttribute("for", rb);
            lb.innerHTML = data.respuestas[i].texto;
            rb.type = 'radio';
            rb.name = 'rbRespuestas';
            rb.id =  data.respuestas[i].texto;
            rb.value = data.respuestas[i].respuestaid;
            respuestas.appendChild(rb);
            respuestas.appendChild(lb);
            respuestas.appendChild(br);
        }
        div1.appendChild(respuestas);
        respuestas.addEventListener('click', clickRB);

        var responder = document.createElement('input');
        responder.type = 'button';
        responder.value = 'Responder';
        responder.id = 'btnResponder';

        var attCorrecta = document.createAttribute('data-correcta');
        attCorrecta.value = data.correcta;
        responder.setAttributeNode(attCorrecta);
        
        responder.addEventListener('click', procesarRespuesta);
        div1.appendChild(responder);

        var cbxMarcar = document.createElement('input');
        cbxMarcar.type = 'checkbox';
        cbxMarcar.id = 'cbExamen';
        cbxMarcar.setAttribute('data-preguntaid', data.nro);
        cbxMarcar.setAttribute('data-categoriaid', categoriaSeleccionada.value);
        cbxMarcar.setAttribute('data-areaid', areaSeleccionada.value);
        var cbLabel = document.createElement("label");
        cbLabel.id = 'cbLabel';
        cbLabel.setAttribute("for",'cbExamen');
        cbLabel.innerHTML = 'Agregar al examen';

        div1.appendChild(cbxMarcar);
        div1.appendChild(cbLabel);

        var closer = document.createElement('input');
        closer.type = 'button';
        closer.value = 'Cerrar';
        closer.id = 'btnCerrar';
        closer.addEventListener('click', closePopup);
        div1.appendChild(closer);

        div0.appendChild(div1);
        //Aparezcase la popup!
        div0.style.display = "block";
        div0.style.outline = "none";
}

/*----------------------------------------------
    Cerrar la popup.
------------------------------------------------*/
function closePopup(ev) {
    ev.preventDefault();
    var el = document.getElementById('text');
    var cbx = document.getElementById('cbExamen');
    if (cbx.checked) {
        var pregExamen = {
            categoriaid: cbx.dataset.categoriaid,
            areaid : cbx.dataset.areaid,
            preguntaid : cbx.dataset.preguntaid
        };
        agregarAlExamen(pregExamen);
    }
    document.body.removeChild(el);
}

/*-----------------------------------------------
    Si el usuario selecciona una respuesta
    y hace click en el boton de responder,
    se ejecuta esta funcion.
--------------------------------------------------*/
function procesarRespuesta(ev) {
    ev.preventDefault();
    var rbs = document.getElementsByName('rbRespuestas');
    var cuantos = rbs.length;
    var correcta = ev.srcElement.dataset.correcta;
    var respondida = null;

    for (var i = 0; i < cuantos; i++) {
        if (rbs[i].checked )
            respondida = rbs[i].defaultValue
    }
    if (respondida === correcta)
        alert('Correcto!');
    else
        alert('Intentelo nuevamente');
}

/*-----------------------------------------------
    Esto esta verde mal! 
    Me falta definir un monton de cosas
-------------------------------------------------*/
function agregarAlExamen(data) {
    var key = 'EXAM_' + categoriaSeleccionada + '_' + areaSeleccionada + '_' +
        data.preguntaid;

    if (localStorage.getItem(key) === null) {
        localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(data));

    var keys = Object.keys(localStorage);
    var cuantas = keys.length;
    var preguntasExamen = [];

    for (var i = 0; i < cuantas; i++) {
        if (keys[i].search("EXAM") === 0) {
            preguntasExamen.push(JSON.parse(localStorage.getItem(keys[i])));
        } 
    }

    console.dir(preguntasExamen);
}