const express = require('express');
const taskModel = require('../models/tasks');
const router = express.Router();
const jwt = require('jsonwebtoken');

// add a task
router.post('/api/task', (req, res) => {
    let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
    if (verifyToken) {
        let task = new taskModel(req.body);
        task.save((err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        })
    }
});

// read a task
router.post('/api/tasks', (req, res) => {
    try {
        let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            taskModel.find((err, data) => {
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
});

module.exports = router;