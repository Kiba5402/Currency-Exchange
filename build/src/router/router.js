"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
//imports 
const express_1 = __importDefault(require("express"));
const api_global_controller_1 = __importDefault(require("../controllers/convert.controllers/api.global.controller"));
//constante
const router = express_1.default.Router();
router.get('/list/:numAPI', api_global_controller_1.default.getCurrencyList);
router.get('/convert/:numAPI/:base/:trg/:qty', api_global_controller_1.default.getConvert);
module.exports = router;
