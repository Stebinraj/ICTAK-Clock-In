const express = require('express');
const taskModel = require('../models/tasks');
const router = express.Router();

router.post('/task', (req, res) => {
    let task = new taskModel(req.body);
    task.save((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
});

router.get('/task', (req, res) => {
    taskModel.find((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
})

module.exports = router;