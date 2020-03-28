"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonFormater_1 = require("../../lib/helpers/jsonFormater");
const api_global_controller_1 = __importDefault(require("../api.controllers/api.global.controller"));
class viewsController {
    //view de la ruta principal
    getHome(req, res) {
        res.render('index.ejs');
    }
    //view de pagina de conversion 
    getConvert(req, res) {
        res.render('inicio.ejs', {
            "listaAPIs": api_global_controller_1.default.getAPIList()
        }, (err, html) => {
            if (err) {
                console.log("Error =>", err);
                res.json(jsonFormater_1.jsonUtils.creaResp(false, 7, undefined));
            }
            else {
                res.json(jsonFormater_1.jsonUtils.creaResp(true, 6, html));
            }
        });
    }
    //view de pagina de informacion 
    getinfo(req, res) {
        res.render('info.ejs', (err, html) => {
            if (err) {
                console.log("Error =>", err);
                res.json(jsonFormater_1.jsonUtils.creaResp(false, 7, undefined));
            }
            else {
                res.json(jsonFormater_1.jsonUtils.creaResp(true, 6, html));
            }
        });
    }
}
module.exports = new viewsController();
