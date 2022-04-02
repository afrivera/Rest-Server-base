const { request, response } = require("express");

const Success = require('../handlers/successHandler');
const authService = require('../services/authService');



const login = async (req = request, res = response, next) =>{
    const { email, password } = req.body;

    try {

        
        res.json( new Success( await authService.login(email, password)))
    } catch (error) {
        next( error );
    }
}

module.exports = {
    login
};