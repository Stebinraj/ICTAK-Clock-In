// model for tasks
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema([{
    label: {
        type: String,
        required:true
    }
}]);

const taskModel = mongoose.model('tasks', taskSchema);

module.exports = taskModel;