const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { promisify } = require('util')
const { Ekubtegna } = require('../DB/Schemas')

const signToken = ( payload ) => {
    return token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.login = async (req, res) => {
    // 1) Receive Credentials
        if(!req.body.phoneNumber || !req.body.password){
            return res.status(400).json({
                status: false,
                result: {
                    msg: "Phone number or password not detected",
                    data: null
                }
            })
        }
        const password = req.body.password
        const phoneNumber = req.body.phoneNumber

    // 2) Check From Database
        const currentUser = await Ekubtegna.findOne({phoneNumber}).select("-drawnEkubs +password")
        if(!currentUser) {
            return res.status(401).json({
                status: false,
                result: {
                    msg: "Ekubtegna has not registered. Please register",
                    data: null
                }
            })
        }

        const trueCredential = await bcrypt.compare(password, currentUser.password)
        const name = currentUser.name
        currentUser.password = undefined

        if(!trueCredential) {
            return res.status(401).json({
                status: false,
                result: {
                    msg: "Incorrect username or password",
                    data: null
                }
            })
        }
    // 3) Create Token
        const token = signToken({
            phoneNumber,
            name
        })
        res.cookie('jwt', token, {
            expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        })

        res.status(200).json({
            status: true,
            result: {
                msg: "login successful",
                token,
                currentUser
            }
        })

}

exports.protect = async (req, res, next) => {

    console.log(req.cookies)
    let token
    if(req.headers.Authorization && req.headers.Authorization.startWith("Bearer")){
        token = req.headers.Authorization.split(" ")[1]
    } else if(req.cookies.jwt) {
        token = req.cookies.jwt
    }
    if(!token){
        res.status(401).json({
            status: false,
            result: {
                msg: "No token, Please login and try again",
                data: null
            }
        })
    }
    let loggingUser 
    try {
      loggingUser  = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            status: false,
            result: {
                msg: error.message || "JWT verification error",
                data: null
            }
        })
    }

    const currentUser = await Ekubtegna.findOne({ phoneNumber: loggingUser.phoneNumber})

    if(!currentUser){
        res.status(401).json({
            status: false,
            result: {
                msg: "Ekubtegna no longer exist.",
                data: null
            }
        })
    }


    req.user = currentUser
    next() 
}

exports.logout = async (req, res, next) => {
    
}