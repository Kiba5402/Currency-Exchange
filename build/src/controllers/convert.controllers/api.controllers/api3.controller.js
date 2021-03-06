"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const currencyList_model_1 = require("../../../models/currencyList.model");
const jsonFormater_1 = require("../../../lib/helpers/jsonFormater");
const currency_model_1 = require("../../../models/currency.model");
const https_1 = __importDefault(require("https"));
class API3Convert {
    constructor() {
        //seteamos la lista de APIS
        const { APIs } = require('../config/list.api.json');
        this.API_List = APIs;
        //seteamos el index del API
        this.API_Index = 2;
        //s el api 
        this.setAPI();
    }
    //funcion en la que seteamos la API que usa esta clase
    setAPI() {
        //API -> Cambio.Today
        this.API = this.API_List[this.API_Index];
    }
    getConvert(codBase, codTarget, cant) {
        return __awaiter(this, void 0, void 0, function* () {
            let URL = this.API.urlBase;
            let query = `convert?q=${codBase}_${codTarget}&apiKey=${this.API.key}`;
            //intentamos enviar la respuesta dle servidor
            try {
                let resp = yield this.connectAPI(URL, query);
                if (resp != 1) {
                    const { results } = JSON.parse(resp);
                    const respF = results[`${codBase}_${codTarget}`];
                    const fecha = respF.lastModDt;
                    return jsonFormater_1.jsonUtils.creaResp(true, 1, new currency_model_1.currency(codBase, cant, [
                        new currency_model_1.currency(codTarget, (respF.val * cant), undefined),
                        fecha.substring(0, fecha.length - 5)
                    ]).toJson());
                }
                else {
                    return jsonFormater_1.jsonUtils.creaResp(false, 3, undefined);
                }
            }
            catch (error) {
                console.log("Se presento el siguiente error =>", error);
                return jsonFormater_1.jsonUtils.creaResp(false, 3, undefined);
            }
        });
    }
    //traemos todas las monedas siponibles en la API
    getAllCurrencys() {
        return __awaiter(this, void 0, void 0, function* () {
            let URL = this.API.urlBase;
            let query = `currencies?apiKey=${this.API.key}`;
            //invocamos la API 
            try {
                let resp = yield this.connectAPI(URL, query);
                if (resp != 1) {
                    const { results } = JSON.parse(resp);
                    return jsonFormater_1.jsonUtils.creaResp(true, 0, this.formatListC(results));
                }
                else {
                    return jsonFormater_1.jsonUtils.creaResp(false, 2, undefined);
                }
            }
            catch (error) {
                console.log("Se presento el siguiente error =>", error);
                return jsonFormater_1.jsonUtils.creaResp(false, 3, undefined);
            }
        });
    }
    //funcion que envia la peticion a la API
    connectAPI(url, query) {
        return new Promise((resolve, reject) => {
            //creamos la peticion http
            https_1.default.get(url + query, resp => {
                let data = '';
                //vamos uniendo la informacion a medida que llega
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                //cuando la peticion finalice mostramos la informacion
                resp.on('end', () => {
                    //convertimos
                    resolve(data);
                });
            }).on('error', (err) => {
                console.log('Se presento el siguiente error =>', err);
                reject(-1);
            });
        });
    }
    //funcion que da formato a la lista de monedas disponibles
    formatListC(resp) {
        let respF = [];
        for (var x in resp) {
            respF.push(new currencyList_model_1.currencyList(x).toJson());
        }
        return respF;
    }
}
exports.API3Convert = API3Convert;
