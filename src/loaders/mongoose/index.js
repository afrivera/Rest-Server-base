const mongoose = require('mongoose');
const config = require('../../config');
const logger = require('../logger');

module.exports = async ()=>{
    await mongoose.connect(config.databaseUrl);
   
};