//imports
import express from 'express';
import morgan from 'morgan';
import router from './router/router';

//hola cristian

//constantes
const app = express();

//settings 
app.set('port', process.env.PORT || 3000);

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//middlewares
app.use(morgan('dev'));
app.use(router);

//listen 
app.listen(app.get('port'), () => {
<<<<<<< HEAD
    console.log('rama TEST', app.get('port'));
});
=======
    console.log('servidor escuchando en el puerto', app.get('port'));
});
>>>>>>> 8022bc16e4b803df9d955d2887caab76440f0b67
