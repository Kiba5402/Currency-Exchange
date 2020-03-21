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
const api1_controller_1 = require("./api.controllers/api1.controller");
const api2_controller_1 = require("./api.controllers/api2.controller");
const api3_controller_1 = require("./api.controllers/api3.controller");
const jsonFormater_1 = require("../../lib/helpers/jsonFormater");
class convertControllerG {
    //funcion que devuelve un listado con todas las monedas disponibles
    //en el API
    getCurrencyList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const numAPI = Number.parseInt(req.params.numAPI);
            const API = convertControllerG.selectAPI(numAPI);
            if (API != undefined) {
                let resp = yield API.getAllCurrencys();
                res.json(resp);
            }
            else {
                let respJson = jsonFormater_1.jsonUtils.creaResp(false, 4, undefined);
                res.json(respJson);
            }
        });
    }
    //funcion que convierte entre monedas
    getConvert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const numAPI = Number.parseInt(req.params.numAPI);
            const API = convertControllerG.selectAPI(numAPI);
            if (API != undefined) {
                const base = req.params.base;
                const trg = req.params.trg;
                const qty = Number.parseInt(req.params.qty);
                let resp = yield API.getConvert(base, trg, qty);
                res.json(resp);
            }
            else {
                let respJson = jsonFormater_1.jsonUtils.creaResp(false, 4, undefined);
                res.json(respJson);
            }
        });
    }
    //funcion que nos devuelve la clase de conexion a la API
    static selectAPI(optAPI) {
        switch (optAPI) {
            case 1:
                return new api1_controller_1.API1Convert();
            case 2:
                return new api2_controller_1.API2Convert();
            case 3:
                return new api3_controller_1.API3Convert();
            default:
                return undefined;
        }
    }
}
module.exports = new convertControllerG();
