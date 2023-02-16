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

router.get('/:_id/:range/:start/:end', async (req, res) => {
    const { _id, range, start, end } = req.params;

    let startDate, endDate;
    switch (range) {
        case 'daily':
            startDate = moment(start).startOf('day');
            endDate = moment(end).endOf('day');
            break;
        case 'weekly':
            startDate = moment(start).startOf('week');
            endDate = moment(end).endOf('week');
            break;
        case 'monthly':
            startDate = moment(start).startOf('month');
            endDate = moment(end).endOf('month');
            break;
        case 'yearly':
            startDate = moment(start).startOf('year');
            endDate = moment(end).endOf('year');
            break;
        default:
            return res.status(400).json({ message: 'Invalid range' });
    }

    const data = await trackerModel.find({ empId: _id, startTime: { $gte: startDate, $lt: endDate } });
    let total = 0;
    data.forEach((item) => {
        total += moment.duration(moment(item.endTime).diff(moment(item.startTime))).asHours();
    });
    const duration = moment.duration(total, 'hours');
    const formattedDuration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
    res.json({ data, total: formattedDuration });
});

router.put('/tracker/:_id', async (req, res) => {
    try {
        let data = req.body;
        trackerModel.findOneAndUpdate({ _id: req.params._id }, data, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
    } catch (err) {
        res.send(err);
    }
});

router.put('/tracker/:_id', async (req, res) => {
    try {
        let data = req.body;
        trackerModel.findOneAndUpdate({ _id: req.params._id }, data, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
    } catch (err) {
        res.send(err);
    }
});

router.delete('/tracker/:_id', async (req, res) => {
    try {
        trackerModel.findOneAndDelete({ _id: req.params._id }, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
    } catch (err) {
        res.send(err);
    }
});


module.exports = router;