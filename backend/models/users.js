// model for user
const mongoose = require('mongoose');

const userSchema = mongoose.Schema([{
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

const userModel = mongoose.model('login', userSchema);

module.exports = userModel;