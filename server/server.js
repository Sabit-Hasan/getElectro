require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const router = require('./routes/userRouter');

const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// using routers
app.use('/api', router);


const PORT = 8000 || process.env.PORT;


// database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connection established!!");
        app.listen(PORT, () => {
            console.log("Server listening on port " + PORT);
        })
    }).catch((err) => {
        console.log("Database connection error: " + err);
    });
