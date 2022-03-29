const express = require('express');
const config = require('../../config');

class ExpressServer{

    constructor(){
        this.app = express();
        this.port = config.port;
        this.pathUser = `${config.api.prefix}/users`;

        this._middlewares();
        this._routes();

    }

    _middlewares(){
        this.app.use( express.json() );
    }

    _routes(){
        this.app.use(this.pathUser, require('../../routes/users'));
    }

    async start(){
        this.app.listen(this.port, (error)=>{
            if(error){
                console.log(error);
                process.exit(1);
                return;
            }
        });
    }
}

module.exports = ExpressServer;