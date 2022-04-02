const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'name required.'] 
    },
    lastName: {
        type: String,
        required: [true, 'last Name required.'] 
    },
    
    email: {
        type: String,
        required: [true, 'email required.'],
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, 'password required.'],
    },
    enable:{
        type: Boolean,
        default: true
    },
    birthdate: Date,
    role: {
        type: String,
        required: true,
        default:'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    }
},{
    timestamps: true
});

userSchema.plugin( uniqueValidator, {message: 'already exist in the DB'});
userSchema.plugin(mongoosePaginate);

module.exports= model('User', userSchema);