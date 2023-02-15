const express = require('express');
const trackerModel = require('../models/tracker');
const router = express.Router();
const moment = require('moment');
const userModel = require('../models/users');

router.post('/tracker', async (req, res) => {
    let tracker = new trackerModel(req.body);
    await tracker.save(async (err, data) => {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send(data);
        };
    });
});

router.get("/tracker/:_id", (req, res) => {
    trackerModel.find({ empId: req.params._id }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
});


router.get('/:_id/:range', async (req, res) => {
    const { _id } = req.params;
    const { range } = req.params;

    let start, end;
    switch (range) {
        case 'daily':
            start = moment().startOf('day');
            end = moment(start).add(1, 'days');
            break;
        case 'weekly':
            start = moment().startOf('week');
            end = moment().endOf('week');
            break;
        case 'monthly':
            start = moment().startOf('month');
            end = moment().endOf('month');
            break;
        case 'yearly':
            start = moment().startOf('year');
            end = moment().endOf('year');
            break;
        default:
            return res.status(400).json({ message: 'Invalid range' });
    }

    const data = await trackerModel.find({ empId: _id, startTime: { $gte: start, $lt: end } });
    let total = 0;
    data.forEach((item) => {
        total += moment.duration(moment(item.endTime).diff(moment(item.startTime))).asHours();
    });
    const duration = moment.duration(total, 'hours');
    const formattedDuration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
    res.json({ data, total: formattedDuration });
});


module.exports = router;