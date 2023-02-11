const express = require('express');
const router = express.Router();
const userModel = require('../models/users');

router.post('/login', (req, res) => {
    let empId = req.body.empId;
    let username = req.body.username;
    let password = req.body.password;
    userModel.findOne({ "empId": empId, "username": username, "password": password }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
});

router.post('/register', async (req, res) => {
    let users = await new userModel(req.body);
    if (users) {
        users.save(async (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        })
    }
});


router.post('/employee', async (req, res) => {
    let works = await new WorksModel(req.body);
    works.save(async (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
})

router.get('/employee', (req, res) => {
    WorksModel.find((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
});

module.exports = router;