// model for tracker
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const trackerSchema = mongoose.Schema([{
    empId: {
        type: ObjectId,
        required:true
    },
    project: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    modeOfWork: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
}]);

const trackerModel = mongoose.model('trackers', trackerSchema);

module.exports = trackerModel;