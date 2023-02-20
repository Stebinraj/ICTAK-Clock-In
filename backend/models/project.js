// model for project
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema([{
    label: {
        type: String,
        required:true
    }
}]);

const projectModel = mongoose.model('projects', projectSchema);

module.exports = projectModel;