const express = require('express');
const projectModel = require('../models/project');
const router = express.Router();

router.post('/project', (req, res) => {
    let projects = new projectModel(req.body);
    projects.save((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
});

router.get('/project', (req, res) => {
    projectModel.find((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
})

module.exports = router;