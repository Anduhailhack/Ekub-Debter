const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = require('./app')


mongoose.connect(process.env.MONGO_CONN)
    .then((data) => {
        console.log(`DB connected:  ${process.env.MONGO_CONN}`);
    }).catch((err) => {
        console.log("Failed to connect to the database \n", err);
    })

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Connected on PORT ${process.env.EXPRESS_PORT}`);
})