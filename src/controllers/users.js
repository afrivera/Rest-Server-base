const { response, request} = require('express');
const userService = require('../services/userService');

const getAllUsers = async(req = request, res = response, next)=>{
    try {
        const users = await userService.findAll();

        res.json({
            users
        })

    } catch (error) {
        next( error );
    }
}

const getById = async( req = request, res = response, next)=>{
    try {
        const { id } = req.params;
        const user = await userService.findById( id );
        res.json({
            user
        })
    } catch (error) {
        next( error );
    }

}

const createUser = async(req = request, res = response, next)=>{
    try {
        let user = req.body;
        user = await userService.save( user );

        res.status(201).json({user});
        
    } catch (error) {
        next( error );
    }

}

const updateUser = async (req = request, res = response, next)=>{
    try {
        const { id } = req.params;
        let user = req.body;

        const userUpdate = await userService.update( id, user );

        res.json({userUpdate});
        
    } catch (error) {
        next( error );
    }
}

const deleteUser = async(req = request, res = response, next)=>{
    try {
        const { id } = req.params;

        await userService.remove( id );

        res.json({msg: 'Deleted'});
        
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