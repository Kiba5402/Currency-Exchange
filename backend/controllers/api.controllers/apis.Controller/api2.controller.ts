import { converterController } from '../../../interfaces/converter.interface';
import { currencyList } from '../../../models/currencyList.model';
import { jsonUtils } from '../../../lib/helpers/jsonFormater';
import { currency } from '../../../models/currency.model';
import https from 'https';

export class API2Convert implements converterController {

    private API_Index: number;
    private API_List: any;
    private API: any;

    constructor() {
        //seteamos la lista de APIS
        const { APIs } = require('../config/list.api.json');
        this.API_List = APIs;
        //seteamos el index del API
        this.API_Index = 1;
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
        let query: string = `${this.API.key}/latest/${codBase}`;
        //intentamos enviar la respuesta dle servidor
        try {
            let resp: any = await this.connectAPI(URL, query);
            if (resp != 1) {
                const { conversion_rates, time_last_update } = JSON.parse(resp);
                const value = conversion_rates[codTarget];
                return jsonUtils.creaResp(true, 1,
                    new currency(codBase, cant, [
                        new currency(codTarget, (value * cant)),
                        this.formatDate(time_last_update)]
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
        let query: string = `${this.API.key}/latest/USD`;
        //invocamos la API 
        try {
            let resp: any = await this.connectAPI(URL, query);
            if (resp != 1) {
                const { conversion_rates } = JSON.parse(resp);
                return jsonUtils.creaResp(true, 0, this.formatListC(conversion_rates));
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

    //funcion para formatear la fecha de actualizacion 
    private formatDate(unixT: number): any {
        let dt: any = new Date(unixT * 1000);
        let day: any = dt.getDay();
        let mth: any = dt.getMonth();
        let year: any = dt.getFullYear();
        let hr: string = dt.getHours();
        let m: string = dt.getMinutes();
        let s: string = dt.getSeconds();
        const z = (num: any) => { return (num < 10) ? "0" + num : num };
        return `${year}-${z(mth)}-${z(day)}T${z(hr)}:${z(m)}:${z(s)}`;
    }

}