import { converterController } from '../../../interfaces/converter.interface';
import { currencyList } from '../../../models/currencyList.model';
import { jsonUtils } from '../../../lib/helpers/jsonFormater';
import { currency } from '../../../models/currency.model';
import https from 'https';

export class API1Convert implements converterController {

    private API_Index: number;
    private API_List: any;
    private API: any;

    constructor() {
        //seteamos la lista de APIS
        const { APIs } : any = require('../config/list.api.json');
        this.API_List = APIs;
        //seteamos el index del API
        this.API_Index = 0;
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
        let query: string = `quotes/${codBase}/${codTarget}/json?quantity=${cant}&key=${this.API.key}`;
        //intentamos enviar la respuesta dle servidor
        try {
            let resp: any = await this.connectAPI(URL, query);
            if (resp != 1) {
                const { result } = JSON.parse(resp);
                return jsonUtils.creaResp(true, 1,
                    new currency(codBase, cant, [
                        new currency(codTarget, (result.value * cant)),
                        result.updated
                    ]).toJson());
            } else {
                return jsonUtils.creaResp(false, 2, undefined);
            }
        } catch (error) {
            console.log("Se presento el siguiente error =>", error);
            return jsonUtils.creaResp(false, 3, undefined);
        }
    }

    //traemos todas las monedas siponibles en la API
    async getAllCurrencys(): Promise<any> {
        let URL: string = this.API.urlBase;
        let query: string = `full/EUR/json?key=${this.API.key}`;
        //invocamos la API 
        try {
            let resp: any = await this.connectAPI(URL, query);
            if (resp != 1) {
                resp = JSON.parse(resp);
                return jsonUtils.creaResp(true, 0, this.formatListC(resp));
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
        respF[0] = new currencyList(resp.result.from);
        for (let i = 1; i <= resp.result.conversion.length; i++) {
            respF[i] = new currencyList(resp.result.conversion[i - 1].to).toJson();
        }
        return respF;
    }
}