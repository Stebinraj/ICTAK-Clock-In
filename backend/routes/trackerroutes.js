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

// router.get('/tracker/:_id', (req, res) => {
//     userModel.find({ "_id": req.params._id }, (err, data) => {
//         let ObjectId = req.params._id;
//         userModel.aggregate([
//             { $match: { _id: ObjectId } },
//             {
//                 $lookup: {
//                     from: 'trackers',
//                     localField: '_id',
//                     foreignField: 'empId',
//                     as: 'works'
//                 }
//             },
//             {
//                 $unwind: '$works'
//             }
//         ])
//             .then(data => {
//                 res.send(data);
//             })
//     })
// });



module.exports = router;