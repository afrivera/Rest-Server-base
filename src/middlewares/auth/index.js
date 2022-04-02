const { check } = require('express-validator');

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

module.exports = {
    postLoginRequestValidations
};
