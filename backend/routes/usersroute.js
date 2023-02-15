const express = require('express');
const router = express.Router();
const userModel = require('../models/users');
const trackerModel = require('../models/tracker');

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    userModel.findOne({ "username": username, "password": password }, (err, data) => {
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

router.get('/users', (req, res) => {
    userModel.find((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});

router.put('/users/:_id', (req, res) => {
    userModel.findByIdAndUpdate({ _id: req.params._id }, req.body, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
})

router.delete('/delete/:_id', async (req, res) => {
    try {
        const userData = await userModel.findByIdAndDelete({ '_id': req.params._id });
        if (!userData) return res.send({ message: 'User not found' });

        const trackerData = await trackerModel.deleteMany({ 'empId': req.params._id });
        res.send({ userData, trackerData });
    } catch (err) {
        res.send(err);
    }
});


module.exports = router;