const ExpressServer = require('./server/expressServer');
const mongooseConfig = require('./mongoose');
const config = require('../config');
const logger = require('./logger');

const startServer = async()=>{

  try {
    
    await mongooseConfig();
  
    const server = new ExpressServer();
    logger.info('Express Loaded');
  
    server.start();
    logger.info(`##########################################
        Server listening on port: ${config.port}
      ##########################################`);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = startServer;