import { Response, Request } from 'express';
import { jsonUtils } from '../../lib/helpers/jsonFormater';
import convertControllerG from '../api.controllers/api.global.controller';

class viewsController {

    //view de la ruta principal
    public getHome(req: Request, res: Response) {
        res.render('index.ejs');
    }

    //view de pagina de conversion 
    public getConvert(req: Request, res: Response) {
        res.render('inicio.ejs', {
            "listaAPIs": convertControllerG.getAPIList()
        }, (err: any, html: any) => {
            if (err) {
                console.log("Error =>", err);
                res.json(jsonUtils.creaResp(false, 7, undefined));
            } else {
                res.json(jsonUtils.creaResp(true, 6, {
                    'html': html,
                    'scripts': ['/assets/js/convert.js']
                }));
            }
        });
    }

    //view de pagina de informacion 
    public getinfo(req: Request, res: Response) {
        res.render('info.ejs', (err: any, html: any) => {
            if (err) {
                console.log("Error =>", err);
                res.json(jsonUtils.creaResp(false, 7, undefined));
            } else {
                res.json(jsonUtils.creaResp(true, 6, {
                    'html': html,
                    'scripts': []
                }));
            }
        });
    }

}

export = new viewsController();