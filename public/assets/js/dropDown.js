const protocol = window.location.protocol;
const url = window.location.host;

//funcion que se ejecuta cuando el documento se carga
document.addEventListener('DOMContentLoaded', () => {
    //ajustamos el alto de la pantalla para el caso de exploradores moviles
    setMeta();
    //iniciamos el escucha del menu para moviles
    eventMenu();
    //iniciamos las escucha de los links de pagina
    iniciaLink();
    //damos click al link inicial
    document.getElementById('ini').click();
});

//funcion que complementa la etiqueta meta
function setMeta() {
    let meta = document.querySelector("#viewPortMeta");
    meta.content += `,height=${window.innerHeight}`;
    console.log(meta);
}

//funcion que muestra el menu desplegable en dispositivos moviles
function eventMenu() {
    document.getElementById('imgDrop').addEventListener('click', event => {
        let drop = document.getElementById('drop');
        if (drop.getAttribute('active') == 0) {
            drop.style.display = 'block';
            drop.setAttribute('active', 1);
        } else {
            drop.style.display = 'none';
            drop.setAttribute('active', 0);
        }
    });
}

//funcion que nos crea un objeto html para representar carga
function creaCarga() {
    let carga = document.createElement('div');
    carga.setAttribute('id', 'carga');
    let img = document.createElement('img');
    img.setAttribute('src', './assets/images/load.gif');
    carga.appendChild(img);
    return (carga);
}

//funcion que setea los escucha de los links 
function iniciaLink() {
    let links = document.getElementsByClassName('link');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', event => {
            blackLink();
            event.target.style.color = '#0052b7';
            getView(event.target.getAttribute("view"));
        });
    }
}

//funcion que deselecciona todos los links
function blackLink() {
    let links = document.getElementsByClassName('link');
    for (let i = 0; i < links.length; i++) {
        links[i].style.color = 'black';
    }
}

//funcion que consulta la vista correspondiente al link
function getView(view) {
    let ajax = new XMLHttpRequest();
    let URL = `${protocol}//${url}/${view}`;

    ajax.open('POST', URL, true);

    ajax.onreadystatechange = () => {
        if (ajax.status == 200 && ajax.readyState == 4) {
            hideContent(() => {
                renderView(ajax.responseText);
            });
        }
    }

    ajax.send();
}

//funcion que esconde el contenido 
function hideContent(callBack) {
    let article = document.getElementById('article')
    if (article.hasChildNodes()) {
        let content = article.childNodes.item(0);
        content.classList.remove('contenido');
        content.classList.add('hideContent');
        setTimeout(() => {
            callBack();
        }, 200);
    } else {
        callBack();
    }
}

//funcion que asigna el html recibido en la consulta ajax
//a la vista pincipal
function renderView(info) {
    let data = JSON.parse(info);
    if (data.flag) {
        //renderizamos el html
        document.getElementById('article').innerHTML = data.data.html;
        //agregamos los scripts
        cargaScritps(data.data.scripts);
    } else {
        document.getElementById('article').innerHTML = `
        <div class="center contenido" style="display: flex;">
            <span style="margin: auto;">
                404 Not Found!
            </span>
        </div>`;
    }
}

//funcion que nos ayuda a insertar los scripts de las vistas que llegan
function cargaScritps(scrtipts) {
    for (let i in scrtipts) {
        document.getElementById(scrtipts[i])?.remove();
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scrtipts[i];
        script.url = scrtipts[i];
        script.id = scrtipts[i];
        head.appendChild(script);
    }
}


