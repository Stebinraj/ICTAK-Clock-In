const mongoose = require('mongoose');

const taskSchema = mongoose.Schema([{
    value: {
        type: String,
        required:true
    },
    label: {
        type: String,
        required:true
    }
}]);

const taskModel = mongoose.model('tasks', taskSchema);

module.exports = taskModel;