const express = require('express')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user')
const authController = require('./controller/auth')


const app = express()

app.use(express.json())
app.use(cookieParser())


app.use("/api/v1", authController.protect, userRouter)
// app.use("/api/v1", )

app.post('/login', authController.login)
app.post('/logout', authController.logout)

module.exports = app