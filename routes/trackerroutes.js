const express = require('express');
const trackerModel = require('../models/tracker');
const router = express.Router();
const moment = require('moment');
const userModel = require('../models/users');
const jwt = require('jsonwebtoken');

// employee time tracker
router.post('/api/tracker', async (req, res) => {
    try {
        let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            let tracker = new trackerModel(req.body);
            await tracker.save(async (err, data) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})

// reading tracker history for specific user
router.post("/api/tracker/:_id", (req, res) => {
    try {
        let veriftToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (veriftToken) {
            trackerModel.find({ empId: req.params._id }, (err, data) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
            })
        }
    } catch (error) {
        console.log(error.message)
    }
});

// read daily, weekly, monthly, yearly data for specific user
router.post('/api/:_id/:range/:start/:end', async (req, res) => {
    try {
        let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
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

            const data = await trackerModel.find({ empId: _id, startTime: { $gte: startDate, $lte: endDate } });
            let total = 0;
            data.forEach((item) => {
                total += moment.duration(moment(item.endTime).diff(moment(item.startTime))).asHours();
            });
            const duration = moment.duration(total, 'hours');
            const formattedDuration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
            res.json({ data, total: formattedDuration });
        }
    } catch (error) {
        console.log(error.message)
    }
});

// update specific employee tracker history
router.put('/api/tracker/:_id', async (req, res) => {
    try {
        let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            trackerModel.findOneAndUpdate({ _id: req.params._id }, req.body, (err, data) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
            });
        }
    } catch (err) {
        res.send(err);
    }
});

// delete specific employee tracker history
router.delete('/api/tracker/:_id', async (req, res) => {
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