const express = require('express');
const trackerModel = require('../models/tracker');
const router = express.Router();

router.post('/tracker', async (req, res) => {
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let totalTime = endTime - startTime
    let tracker = new trackerModel({ startTime, endTime, totalTime });
    await tracker.save(async (err, data) => {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(data);
        };
    });
});

router.get('/tracker', (req, res) => {
    trackerModel.find(async (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});

module.exports = router;