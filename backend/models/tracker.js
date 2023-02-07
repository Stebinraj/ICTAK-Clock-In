const mongoose = require('mongoose');

const trackerSchema = mongoose.Schema([{
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    totalTime: {
        type: Date,
        required: true
    }
}]);

const trackerModel = mongoose.model('trackers', trackerSchema);

module.exports = trackerModel;