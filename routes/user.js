const express = require('express')
const bcrypt = require('bcrypt')
const {Ekub, Ekubtegna, BaleEkub} = require('./../DB/Schemas')
const userController = require('./../controller/user')
const authController = require('./../controller/auth')

const router = express.Router()

// router.post('/login', authController.login)

router.post('/try', (req, res) => {
    res.send("Working")
    console.log(Ekub);

})

router.post('/ekub', userController.createEkub)

router.post('/ekubtegna', userController.addEkubtegna)

router.get('/ekub/:ekubsName?', userController.getEkub)

router.get('/ekubtegna/:ekubsName/:phoneNumber?', userController.getEkubtegnas)

router.get('/me', userController.getMe)

router.post('/getEkubs', async (req, res) => {
    const ekubs = await Ekubtegna.find({'drawnEkubs': {$elemMatch: {ekubId: '64d2aa41aa5706831db096ef'}}})
    // const ekubs = await Ekub.find({'_id': '64d2aa41aa5706831db096ef'})
    // const ekubs = await Ekubtegna.find({'drawnEkubs.ekubId': '64d2aa41aa5706831db096ef'})

    // console.log(ekubs);

    const aggregated = await Ekubtegna.aggregate([
        {
            $group: {
                _id: {
                    EkubPortion: "$drawnEkubs.ekubPortion",
                    EkubId: "$drawnEkubs.ekubId"
                },
                // _id: "$drawnEkubs.ekubId",
                qty: { $sum: 1}
            }
        }
    ])

    console.log(aggregated);
    res.send(aggregated)
})

router.patch('/payEkub/:ekubsName/:phoneNumber', userController.payEkub)

module.exports = router