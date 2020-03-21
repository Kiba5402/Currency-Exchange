import { converterController } from '../../interfaces/converter.interface';
import { API1Convert } from './api.controllers/api1.controller';
import { API2Convert } from './api.controllers/api2.controller';
import { API3Convert } from './api.controllers/api3.controller';
import { jsonUtils } from '../../lib/helpers/jsonFormater';
import { Request, Response } from 'express';

class convertControllerG {

    //funcion que devuelve un listado con todas las monedas disponibles
    //en el API
    public async getCurrencyList(req: Request, res: Response): Promise<any> {
        const numAPI: number = Number.parseInt(req.params.numAPI);
        const API: converterController | undefined = convertControllerG.selectAPI(numAPI);
        if (API != undefined) {
            let resp: any = await API.getAllCurrencys();
            res.json(resp);
        } else {
            let respJson: any = jsonUtils.creaResp(false, 4, undefined);
            res.json(respJson)
        }
    }

    //funcion que convierte entre monedas
    public async getConvert(req: Request, res: Response): Promise<any> {
        const numAPI: number = Number.parseInt(req.params.numAPI);
        const API: converterController | undefined = convertControllerG.selectAPI(numAPI);
        if (API != undefined) {
            const base: string = req.params.base;
            const trg: string = req.params.trg;
            const qty: number = Number.parseInt(req.params.qty);
            let resp = await API.getConvert(base, trg, qty);
            res.json(resp);
        } else {
            let respJson: any = jsonUtils.creaResp(false, 4, undefined);
            res.json(respJson)
        }
    }

    //funcion que nos devuelve la clase de conexion a la API
    static selectAPI(optAPI: number): converterController | undefined {
        switch (optAPI) {
            case 1:
                return new API1Convert();
            case 2:
                return new API2Convert();
            case 3:
                return new API3Convert();
            default:
                return undefined;
        }
    }

}

export = new convertControllerG();