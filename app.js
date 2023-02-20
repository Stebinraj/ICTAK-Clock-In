const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
 
const trackerRoutes = require('./routes/trackerroutes');
const userRoutes = require('./routes/usersroute');
const projectRoutes = require('./routes/projectroutes');
const taskRoutes = require('./routes/tasksroute');

const app = new express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, '/build')));

app.use(trackerRoutes);
app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on the PORT ${process.env.PORT}`);
});




