const { check, validationResult } = require('express-validator');
const { ROLES } = require('../../constants');
const AppError = require('../../errors/appError');
const userService = require('../../services/userService');

// validations
const _nameRequired = check('name', 'Name required').not().isEmpty();
const _lastNameRequired = check('lastName', 'Last Name required').not().isEmpty();
const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is Invalid').isEmail();
const _emailExist = check('email').custom(
    async (email = '') =>{
        const userFound = await userService.findByEmail(email );
        if(userFound){
            throw new AppError('Email already exist in DB', 400 );
        }
    }
);
const _passwordRequired = check('password', 'Password required').not().isEmpty();
const _roleValid = check('role').optional().custom(
    async (role ='')=>{
        if(!ROLES.includes(role)){
            throw new AppError('Invalid Role', 400);
        }
    }
);
const _dateValid = check('birthday').optional().isDate('MM-DD-YYYY');


// validations put
const _idRequired = check('id', 'Id required').not().isEmpty();
const _idMongo = check('id', 'Id Invalid').isMongoId();
const _optionalEmailValid = check('email', 'Email is Invalid').optional().isEmail();
const _optionalEmailExist = check('email').optional().custom(
    async (email = '') =>{
        const userFound = await userService.findByEmail(email );
        if(!userFound){
            throw new AppError('Email already exist in DB', 400 );
        }
    }
);
const _idExist = check('id').custom(
    async (id = '') =>{
        const userFound = await userService.findById( id );
        if(!userFound){
            throw new AppError('The Id does not exist in DB', 400 );
        }
    }
);

const _validationResult = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new AppError('Validation Errors', 400, errors.errors);
        // throw new Error(`Validation Errors: ${ JSON.stringify( errors ) }`);
    }

    next();
}

const postRequestValidations = [
    _nameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _lastNameRequired,
    _passwordRequired,
    _roleValid,
    _dateValid,
    _validationResult
];

const putRequestValidations = [
    _idRequired,
    _idMongo,
    _idExist,
    _optionalEmailValid,
    _optionalEmailExist,
    _roleValid,
    _dateValid,
    _validationResult
];

module.exports = {
    postRequestValidations,
    putRequestValidations
}