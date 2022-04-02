const express = require('express');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const config = require('../../config');
const logger = require('../logger');

class ExpressServer{

    constructor(){
        this.app = express();
        this.port = config.port;
        this.pathUser = `${config.api.prefix}/users`;
        this.pathAuth = `${config.api.prefix}/auth`;

        this._middlewares();
        this._swaggerConfig();
        this._routes();

        // bad request or route doesnt exist
        this._notFound();
        this._errorHandler();

    }

    _middlewares(){
        this.app.use( express.json() );
        this.app.use(morgan('tiny'));
    }

    _routes(){
        this.app.head("/status",(req, res)=>{
            res.status(200).end();
        });
        this.app.use(this.pathUser, require('../../routes/users')); 
        this.app.use(this.pathAuth, require('../../routes/auth')); 
    }

    _notFound(){
        this.app.use((req, res, next)=>{
            const err = new Error('Not Found');
            err.status = 404;
            err.code = 404;
            next(err);
        })
    }

    _errorHandler(){
        this.app.use((err, req, res, next)=>{
            const code = err.code || 500;

            logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${ req.method} - ${ req.ip }`);
            logger.error(err.stack);

            res.status(code);
            const body = {
                error: {
                    code,
                    message: err.message,
                    detail: err.data
                }
            }
            res.json(body);
        });
    }

    _swaggerConfig(){
        this.app.use(
            config.swagger.path,
            swaggerUI.serve,
            swaggerUI.setup(require('../swagger/swagger.json'))
        )
    }

    async start(){
        this.app.listen(this.port, (error)=>{
            if(error){
                logger.error(error);
                process.exit(1);
                return;
            }
        });
    }
}

module.exports = ExpressServer;