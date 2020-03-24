//imports 
import express, { Router } from 'express';
import convertControllerG from '../controllers/convert.controllers/api.global.controller';
import {Request, Response} from 'express';

//constante
const router: Router = express.Router();

router.get('/', (req : Request, res : Response) => {
    res.render('index.ejs');
});


router.get('/list/:numAPI', convertControllerG.getCurrencyList);

router.get('/convert/:numAPI/:base/:trg/:qty', convertControllerG.getConvert);

//exportamos
export = router;
