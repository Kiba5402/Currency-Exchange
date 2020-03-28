"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
//imports 
const express_1 = __importDefault(require("express"));
const api_global_controller_1 = __importDefault(require("../controllers/api.controllers/api.global.controller"));
//constante
const router = express_1.default.Router();
//ruta inicial que pinta el home
router.get('/', (req, res) => {
    res.render('index.ejs');
});
//ruta que trae loa lista de APIs disponibles
router.get('/API_List', api_global_controller_1.default.getAPIList);
//ruta para enlistar las divisas disponibles
router.get('/list/:numAPI', api_global_controller_1.default.getCurrencyList);
//ruta para realizar la conversion
router.get('/convert/:numAPI/:base/:trg/:qty', api_global_controller_1.default.getConvert);
module.exports = router;
