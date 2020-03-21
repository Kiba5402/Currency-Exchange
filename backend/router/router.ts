//imports 
import express, { Router } from 'express';
import convertControllerG from '../controllers/convert.controllers/api.global.controller';

//constante
const router: Router = express.Router();

router.get('/list/:numAPI', convertControllerG.getCurrencyList);

router.get('/convert/:numAPI/:base/:trg/:qty', convertControllerG.getConvert);

//exportamos
export = router;
