const { Schema, model } = require('mongoose');

const userSchema = Schema([{
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}]);

const userModel = model('login', userSchema);

module.exports = userModel;