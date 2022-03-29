const { response, request} = require('express');

const getAllUsers = (req = request, res = response)=>{
    res.json({msg: "it Works!!"})
}

const createUser = (req = request, res = response)=>{

}

const updateUser = (req = request, res = response)=>{

}

const updatePartialUser = ( req = request, res = response)=>{

}

const deleteUser = (req = request, res = response)=>{
    
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser
}