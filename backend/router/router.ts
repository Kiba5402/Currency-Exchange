//imports 
import express, { Router, Request, Response } from 'express';
import viewsController from '../controllers/views.controllers/views.controller';
import convertControllerG from '../controllers/api.controllers/api.global.controller';

//constante
const router: Router = express.Router();

//ruta inicial que pinta el home
router.get('/', viewsController.getHome);

//ruta inicial que pinta el inicio
router.post('/inicio', viewsController.getConvert);

//ruta que devuleve la vista de informacion
router.post('/informacion', viewsController.getinfo);

//ruta que trae loa lista de APIs disponibles
router.post('/API_List', convertControllerG.getAPIList);

//ruta para enlistar las divisas disponibles
router.post('/list/:numAPI', convertControllerG.getCurrencyList);

//ruta para realizar la conversion
router.post('/convert/:numAPI/:base/:trg/:qty', convertControllerG.getConvert);

//exportamos
export = router;
