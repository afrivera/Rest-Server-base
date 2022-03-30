const { response, request} = require('express');

const User = require('../models/user');

const getAllUsers = async(req = request, res = response, next)=>{
    try {
        const { limit = 5, since= 0} = req.query;
        const query = { state: true };
        const [ total, users ] = await Promise.all([
            User.countDocuments( query ),
            User.find(query)
                            .skip(Number( since ))
                            .limit(Number( limit ))
        ]);

        res.json({
            total,
            users
        })

    } catch (error) {
        next( error );
    }
}

const createUser = async(req = request, res = response, next)=>{
    try {
        let user = req.body;
        user = new User( user );

        await user.save();

        res.status(201).json({user});
        
    } catch (error) {
        next( error );
    }

}

const updateUser = async (req = request, res = response, next)=>{
    try {
        const { id } = req.params;
        let user = req.body;

        const userUpdate = await User.findByIdAndUpdate( id, user, { new: true } );

        res.json({userUpdate});
        
    } catch (error) {
        next( error );
    }
}

const updatePartialUser = ( req = request, res = response)=>{

}

const deleteUser = async(req = request, res = response, next)=>{
    try {
        const { id } = req.params;

        await User.findByIdAndDelete( id );

        res.json({msg: 'Deleted'});
        
    } catch (error) {
        next( error );
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}