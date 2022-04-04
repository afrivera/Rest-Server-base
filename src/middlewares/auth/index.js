const { request } = require('express');
const { check } = require('express-validator');
const { validToken, validRol } = require('../../services/authService');

const { validResult } = require('../common');



const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is Invalid').isEmail();


const _passwordRequired = check('password', 'Password required').not().isEmpty();

const postLoginRequestValidations = [
    _emailRequired,
    _emailValid,
    _passwordRequired,
    validResult
];

// validar jwt
const validJWT = async( req = request, res, next )=>{
    try {
        const token  = req.header('Authorization-Token');
        const user = await validToken( token );
        req.user = user;

        next();

    } catch (error) {
        next( error );
    }

}

const hasRole = ( ...roles ) =>{
    return ( req, res, next ) =>{
        try {
            validRol( req.user, ...roles );
            next();            
        } catch (error) {
            next( error );
        }
    }
}

module.exports = {
    postLoginRequestValidations,
    validJWT,
    hasRole
};
