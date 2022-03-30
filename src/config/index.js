const dotenv = require('dotenv');

const envFound = dotenv.config();

// sino se encuentra archivo .env muestra el siguiente error
if(!envFound){
    throw new Error("Couldn't find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'developmennt';

module.exports = {
    port: process.env.PORT,
    api:{
        prefix: '/api/v1',
    },
    log:{
        level: process.env.LOG_LEVEL
    },
    swagger:{
        path: '/documentation'
    }
}