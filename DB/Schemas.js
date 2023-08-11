const mongoose = require('mongoose')
require('dotenv').config('../.env')

const ekubtegnaSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, "Ekubtegna's Name must be specified"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Ekubtegna's Name must be specified"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Ekubtegna's password must be specified"],
        select: false
    },
    drawnEkubs: [{
        ekubId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, "Ekub's Id must be specified"],
        },
        winnerNumber: {
            type: Number,
            required: [true, "Ekub drawing number must be specified"],
        },
        paidWeeks: {
            type: [Number],
            default: []
        },
        ekubPortion: {
            type: String,
            required: [true, "Ekub's Porion must be specified as either Full, Half or Quarter"],
            enum: ["full", "half", "quarter"]
        }
    }],

})

const ekubSchema = new mongoose.Schema({
    collector: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'BaleEkub',
        required: [true, "Ekub's Collector must be specified"]
    },
    ekubsName: {
        type: String,
        default: "እቁቤ",
        unique: true
    },
    // ekubtegnas: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'Ekubtegna'
    // },
    sizeOfEkub: {
        type: Number,
        required: [true, "Ekubtegna's Number must be specified"],
        default: 0
    },
    noOfWeeks: {
        type: Number,
        required: [true, "Ekub's Week Length must be specified"]
    },
    currentWeek : {
        type: Number,
        default: 0
    },
    amountOfMoney: {
        type: Number,
        required: [true, "Ekub's Amount of Money must be specified"]
    },
    weeklyWinners: {
        type: [Number],             //This number is the Drawing number of the Ekubtegna
    },
    bankAccounts: [{
        bank: String,
        number: Number
    }]
})


const baleEkubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Ekub collector's Name must be specified"]
    },
    phoneNumber: {
        type : String,
        required: [true, "Ekub collector's Phone Number must be specified"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Ekub collector's password must be specified"],
        select: false
    },
    ekubs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ekub'
    }  
})


const Ekubtegna = mongoose.model('Ekubtegna', ekubtegnaSchema)
const BaleEkub = mongoose.model('BaleEkub', baleEkubSchema)
const Ekub = mongoose.model('Ekub', ekubSchema)


// Ekub.findOneAndUpdate({}, {password: "sth"})
module.exports = { Ekub, Ekubtegna, BaleEkub }