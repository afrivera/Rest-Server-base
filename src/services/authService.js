const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config')
const AppError = require('../errors/appError');
const userService = require('./userService');

const login = async(email, password) =>{
    try {
        
        // validación de email
        const user = await userService.findByEmail( email );
        if( !user ){
            throw new AppError('Authentication failed! email/password incorrects', 400);
        }

        // validar si usuario está habilitado
        if(!user.enable){
            throw new AppError('Authentication failed! user does not exist!', 400)
        }

        // validación de password
        const isPasswordValid = await bcript.compare(password, user.password);

        if( isPasswordValid ){
            throw new AppError('Authentication failed! email/password incorrects', 400);
        }

        // generar JWT
        const token  = await _generarJWT(user._id);

        return {
            token,
            user: user.name,
            role: user.role
        }
        
    } catch (error) {
        throw error;
    }
}

const validToken = async token=>{
    try {
        // validar que el token venga
        if( !token ){
            throw new AppError('Authenticacion failed! Token required', 401)
        }

        // validar que token sea integro
        let id;
        try {
            const obj = jwt.verify( token, config.auth.secret );
            id = obj.id
            
        } catch (error) {
            throw new AppError('Authentication failed! invalid token', 401, token);
        }

        // validar si existe usuario en BD
        const user = await userService.findById( id );
        if(!user){
            throw new AppError('Authenticacion failed! user does not exist', 401)
        }

        // validar si usuaria está habilitado
        if( !user.enable ){
            throw new AppError('Authenticacion failed! user disabled', 401)
        }

        // retornar el usuario
        return user;
        
    } catch (error) {
        throw error;
    }
}

const _generarJWT = (id)=>{
    return new Promise((resolve, reject)=>{
        jwt.sign({ id }, config.auth.secret, {
            expiresIn: config.auth.ttl
        }, (err, token)=>{
            if(err){
                reject('No se pudo generar Token');
            }else{
                resolve( token );
            }
        });

    });
}

module.exports = {
    login,
    validToken
}