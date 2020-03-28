"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
//imports 
const express_1 = __importDefault(require("express"));
const views_controller_1 = __importDefault(require("../controllers/views.controllers/views.controller"));
const api_global_controller_1 = __importDefault(require("../controllers/api.controllers/api.global.controller"));
//constante
const router = express_1.default.Router();
//ruta inicial que pinta el home
router.get('/', views_controller_1.default.getHome);
//ruta inicial que pinta el inicio
router.post('/inicio', views_controller_1.default.getConvert);
//ruta que devuleve la vista de informacion
router.post('/informacion', views_controller_1.default.getinfo);
//ruta que trae loa lista de APIs disponibles
router.post('/API_List', api_global_controller_1.default.getAPIList);
//ruta para enlistar las divisas disponibles
router.post('/list/:numAPI', api_global_controller_1.default.getCurrencyList);
//ruta para realizar la conversion
router.post('/convert/:numAPI/:base/:trg/:qty', api_global_controller_1.default.getConvert);
module.exports = router;
