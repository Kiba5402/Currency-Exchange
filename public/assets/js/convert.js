/* const protocol2 = window.location.protocol;
const url2 = window.location.host; */

//funcion de escucha para el select
document.getElementById('API').addEventListener('change', (event) => {
    getCurrencyList(event.target);
});

//funcion que escucha los select de las divisas
function addDivisas() {
    let selects = document.getElementsByClassName('divisa');
    for (let i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', listenDivisas);
    }
}

//funcion que comprueba si los dos select de divisa estas seleccionados
function listenDivisas() {
    let selects = document.getElementsByClassName('divisa');
    let cant = document.getElementById('cantidadInput');
    let bool = true;

    for (let i = 0; i < selects.length; i++) {
        bool = bool && selects[i].value != -1;
    }

    if (bool) {
        cant.removeAttribute('disabled');
        cant.addEventListener('keyup', comVal);
    } else {
        cant.value = '';
        cant.setAttribute('disabled', true);
        cant.removeEventListener('keyup', comVal);
    }
}

//funcion que comprueba si el valor de la cantidad es diferente a cero
function comVal(event) {
    let btn = document.querySelector("#btnConvertir");
    if (event.target.value !== '') {
        btn.classList.remove('disabled');
        btn.addEventListener('click', getConvert);
    } else {
        btn.classList.add('disabled');
        btn.removeEventListener('click', getConvert);
    }
}

//funcion escucha del input de cantidad
function onlyNumber(event) {
    console.log(event);
    let regex = /[^0-9]/g;
    let match = event.key.match(regex);
    console.log(match);
    if (match !== null && (event.keyCode !== 37 && event.keyCode !== 39  && event.keyCode !== 8)) {
        return false;
    }
    return true;
}

//funcion que trae la conversion 
function getConvert() {
    let ajax = new XMLHttpRequest();
    let btn = document.querySelector("#btnConvertir");
    let b = document.querySelector('#baseOption').value;
    let t = document.querySelector('#destinoOption').value;
    let qty = document.querySelector('#cantidadInput').value;
    let api = document.querySelector('#API').value;
    let URL = `${protocol}//${url}/convert/${api}/${b}/${t}/${qty}`;
    console.log('->',URL);
    let load = document.getElementById('loadGif');

    ajax.open('POST', URL, true);

    ajax.onloadstart = () => {
        load.style.display = 'inline';
        btn.classList.add('disabled');
        btn.removeEventListener('click', getConvert);        
    }

    ajax.onreadystatechange = () => {
        if (ajax.status == 200 && ajax.readyState == 4) {
            load.style.display = 'none';
            renderConvert(ajax.responseText);
            btn.classList.remove('disabled');
            btn.addEventListener('click', getConvert);
        }
    }

    ajax.send();
}

//funcion que pinta la conversion 
function renderConvert(info) {
    let { data, flag } = JSON.parse(info);
    if (flag) {
        let labelRes = document.querySelector('#labelRes');
        let res = document.querySelector('#resultado');
        let time = document.querySelector('#timeAct');

        labelRes.innerHTML = `(${data.cantFormat}) ${data.code} -> ${data.convert.data.code} `;
        res.innerHTML = data.convert.data.cantFormat;
        time.innerHTML = `${data.convert.lastUpdate} UTC`;

    }
}

//funcion que consulta la lista de divisas 
function getCurrencyList(id) {
    let ajax = new XMLHttpRequest();
    let URL = `${protocol}//${url}/list/${id.value}`;
    let load = document.getElementById('loadGif');

    ajax.open('POST', URL, true);

    ajax.onloadstart = () => {
        load.style.display = 'inline';
    }

    ajax.onreadystatechange = () => {
        if (ajax.status == 200 && ajax.readyState == 4) {
            renderCurrencys(ajax.responseText);
            load.style.display = 'none';
        }
    }

    ajax.send();
}

//funcion que pinta las monedas disponibles en los select
function renderCurrencys(info) {
    resetElements();
    let infoAux = JSON.parse(info);
    let selectB = document.getElementById('baseOption');
    let selectCa = document.getElementById('destinoOption');
    if (infoAux.flag) {
        for (let i in infoAux.data) {
            let option = document.createElement('option');
            let name = infoAux.data[i].name;
            let code = infoAux.data[i].code;
            option.value = code;
            option.text = `${name} | ${code}`;
            option2 = option.cloneNode(true);
            selectB.appendChild(option);
            selectCa.appendChild(option2);
            addDivisas();
        }
        selectB.removeAttribute('disabled');
        selectCa.removeAttribute('disabled');
    }
}

//funcion que resetea los inputs y los select
//para cuando se cambia de API
function resetElements() {
    let selectB = document.getElementById('baseOption');
    let selectCa = document.getElementById('destinoOption');
    let cant = document.getElementById('cantidadInput');
    let btnConvert = document.getElementById('btnConvertir');
    let option = `<option value="-1">Seleccione una divisa</option>`;
    selectB.innerHTML = option;
    selectCa.innerHTML = option;
    cant.value = "";
    selectB.setAttribute('disabled', true);
    selectCa.setAttribute('disabled', true);
    cant.setAttribute('disabled', true);
    btnConvert.classList.add('disabled');
}
