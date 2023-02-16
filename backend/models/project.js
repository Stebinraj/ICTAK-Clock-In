const mongoose = require('mongoose');

const projectSchema = mongoose.Schema([{
    value: {
        type: String,
        required:true
    },
    label: {
        type: String,
        required:true
    }
}]);

const projectModel = mongoose.model('projects', projectSchema);

module.exports = projectModel;