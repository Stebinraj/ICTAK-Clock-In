const express = require('express');
const trackerModel = require('../models/tracker');
const router = express.Router();

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

// router.get('/tracker', (req, res) => {
//     trackerModel.find(async (err, data) => {
//         if (err) {
//             res.send(err);
//         }
//         else {
//             res.send(data);
//         }
//     });
// });

router.get("/tracker/:empId", (req, res) => {
    trackerModel.find({ empId: req.params.empId }, async (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
});

module.exports = router;