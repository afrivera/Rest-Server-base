const { response, request} = require('express');
const userService = require('../services/userService');
const Success = require('../handlers/successHandler');

const getAllUsers = async(req = request, res = response, next)=>{
    try {
        const { filter, options } = req.query;
        const users = await userService.findAll( filter, options);

        res.json(
            new Success(users)
        )

    } catch (error) {
        next( error );
    }
}

const getById = async( req = request, res = response, next)=>{
    try {
        const { id } = req.params;
        const user = await userService.findById( id );
        res.json(
            new Success(user)
        )
    } catch (error) {
        next( error );
    }

}

const createUser = async(req = request, res = response, next)=>{
    try {
        let user = req.body;
        user = await userService.save( user );

        res.status(201).json(new Success( user ));
        
    } catch (error) {
        next( error );
    }

}

const updateUser = async (req = request, res = response, next)=>{
    try {
        const { id } = req.params;
        const {password, ...user} = req.body;

        const userUpdate = await userService.update( id, user );

        res.json(new Success( userUpdate ));
        
    } catch (error) {
        next( error );
    }
}

const deleteUser = async(req = request, res = response, next)=>{
    try {
        const { id } = req.params;

        await userService.remove( id );

        res.json(new Success({ msg: `user with id: ${id} deleted`}));
        
    } catch (error) {
        next( error );
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getById,
    deleteUser
}