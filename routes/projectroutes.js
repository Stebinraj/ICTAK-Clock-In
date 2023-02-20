const express = require('express');
const projectModel = require('../models/project');
const router = express.Router();
const jwt = require('jsonwebtoken');


// adding a project
router.post('/api/project', (req, res) => {
    let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
    if (verifyToken) {
        let projects = new projectModel(req.body);
        projects.save((err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        })
    }
});


// reading projects
router.post('/api/projects', (req, res) => {
    try {
        let verifyToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (verifyToken) {
            projectModel.find((err, data) => {
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

module.exports = router;