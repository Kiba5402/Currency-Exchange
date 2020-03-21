import { converterController } from '../../../interfaces/converter.interface';
import { currencyList } from '../../../models/currencyList.model';
import { jsonUtils } from '../../../lib/helpers/jsonFormater';
import { currency } from '../../../models/currency.model';
import https from 'https';

export class API3Convert implements converterController {

    private API_Index: number;
    private API_List: any;
    private API: any;

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
    setAPI(): void {
        //API -> Cambio.Today
        this.API = this.API_List[this.API_Index];
    }

    async getConvert(codBase: string, codTarget: string, cant: number): Promise<any> {
        let URL: string = this.API.urlBase;
        let query: string = `convert?q=${codBase}_${codTarget}&apiKey=${this.API.key}`;
        //intentamos enviar la respuesta dle servidor
        try {
            let resp: any = await this.connectAPI(URL, query);
            if (resp != 1) {
                const { results } = JSON.parse(resp);
                const respF = results[`${codBase}_${codTarget}`];
                const fecha = respF.lastModDt;
                return jsonUtils.creaResp(true, 1,
                    new currency(codBase, cant, [
                        new currency(codTarget, (respF.val * cant), undefined),
                        fecha.substring(0, fecha.length - 5)]
                    ).toJson());
            } else {
                return jsonUtils.creaResp(false, 3, undefined);
            }
        } catch (error) {
            console.log("Se presento el siguiente error =>", error);
            return jsonUtils.creaResp(false, 3, undefined);
        }
    }

    //traemos todas las monedas siponibles en la API
    async getAllCurrencys(): Promise<any> {
        let URL: string = this.API.urlBase;
        let query: string = `currencies?apiKey=${this.API.key}`;
        //invocamos la API 
        try {
            let resp: any = await this.connectAPI(URL, query);
            if (resp != 1) {
                const { results } = JSON.parse(resp);
                return jsonUtils.creaResp(true, 0, this.formatListC(results));
            } else {
                return jsonUtils.creaResp(false, 2, undefined);
            }
        } catch (error) {
            console.log("Se presento el siguiente error =>", error);
            return jsonUtils.creaResp(false, 3, undefined);
        }
    }

    //funcion que envia la peticion a la API
    connectAPI(url: string, query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            //creamos la peticion http
            https.get(url + query, resp => {
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
    formatListC(resp: any): currencyList[] {
        let respF: any[] = [];
        for (var x in resp) {
            respF.push(new currencyList(x).toJson());
        }
        return respF;
    }
}