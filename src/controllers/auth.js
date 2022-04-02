const { request, response } = require("express");

const userService = require('../services/userService');
const Success = require('../handlers/successHandler');



const login = async (req = request, res = response, next) =>{
    const { email, password } = req.body;

    try {
        
        res.json( new Success({ msg: 'todo ok'}))
    } catch (error) {
        next( error );
    }
}

module.exports = {
    login
};
