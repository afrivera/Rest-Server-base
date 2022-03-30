const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'the name field is required.'] 
    },
    email: {
        type: String,
        required: [true, 'the email field is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'the email field is required.'],
    },
    // this is an optional field.
    state:{
        type: Boolean,
        default: false
    },
    birthday:{
        type: Date,
        default: Date.now
    }
});


module.exports= model('User', userSchema);