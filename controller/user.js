const bcrypt = require('bcrypt')
const { Ekub, Ekubtegna, BaleEkub } = require('./../DB/Schemas')

exports.createEkub = async (req, res) => {      // Create a new Equb

    const {ekubsName, noOfEkubtegna, noOfWeeks, amountOfMoney, bankAccounts } = req.body
    const { name, phoneNumber} = req.body
    let {password} = req.body, ekub

    password = await bcrypt.hash(password, 10)
    
    const baleEkub = { name, phoneNumber, password}
    try {
        const baleEkubDb = await BaleEkub.create(baleEkub)
        collector = baleEkubDb._id

        ekub = { collector, ekubsName, noOfEkubtegna, noOfWeeks, amountOfMoney, bankAccounts }
        await Ekub.create(ekub)
    } catch (error) {
        return res.status(400).json({
            status: false,
            result: {
                msg: error.message || "Data creating error /ekub",
                data: null
            }
        })
    }

    res.status(200).json({
        status: true,
        result: {
            msg: `${ekubsName}'s Ekub has successfully created.`,
            data: ekub
        }
    })
}

exports.addEkubtegna =  async (req, res) => {
    const {name, phoneNumber, drawnEkubs} = req.body
    let password = phoneNumber
    let ekubtegna, ekub

    let ekubsName

    password = await bcrypt.hash(password, 10)

    try {           // Check if the request contains the Ekubtegna's Ekub and create a reference with the Ekub
        if(req.body.hasOwnProperty('drawnEkubs') && typeof(req.body.drawnEkubs) === 'object'){

            ekubsName = drawnEkubs.ekubsName

            // docEkubtegna : to get the number of Ekubtegnas that references the stated ekub and check if ekub is not full
            if(!drawnEkubs.ekubId){
                ekub = await Ekub.findOne({ekubsName})
                drawnEkubs.ekubId = ekub._id.toString()
            }
            // const docEkubtegna = await Ekubtegna.find({'drawnEkubs[0].ekubId':'ekub._id'})
            const docEkubtegna = await Ekubtegna.find({'drawnEkubs': { $elemMatch: {ekubId: drawnEkubs.ekubId || ekub._id}}})
            
            if(docEkubtegna.length >= ekub.noOfEkubtegna){
                throw new Error ("Can not Add this Ekubtegna because the Maximum Size of the Ekub is Reached")
            }

        }
        ekubtegna = await Ekubtegna.create({name, phoneNumber, password, drawnEkubs})
        ekubtegna.password = undefined
        
    } catch (error) {
        if(error.code === 11000) {
            return res.status(400).json({
                status: false,
                result: {
                    msg:`Ekubtegna "${name}" has already registred`
                }
            })
        }
        return res.status(400).json({
            status: false,
            result: {
                msg: error.message || "Error while creating the Ekubtegna"
            }
        })
    }

    res.status(200).json({
        status: true,
        result: {
            msg: ekubsName ? `${name} has beed added in ${ekubsName}'s Ekub` : `${name} has been added and not member of any ekub`,
            data: ekubtegna
        }
    })
}

exports.getEkub = async (req, res) => {
    let ekubsName;
    if (req.params.ekubsName || req.body.ekubsName)
        ekubsName = req.params.ekubsName || req.body.ekubsName
    
    let ekub;   
    try {
        if(!ekubsName){
            ekub = await Ekub.find({})
            ekubsName = "all"
        } else {
            ekub = await Ekub.findOne({ekubsName})
        }
        if(!ekub) throw new Error(`No Ekub with the name ${ekubsName}.`)
    } catch (error) {
        return res.status(400).json({
            status: false,
            result: {
                msg: error.message || "Data finding error /ekub/:ekubsName"
            }
        }) 
    }

    return res.status(200).json({
        status: true,
        result: {
            msg: `${ekubsName}'s Ekub: `,
            data: ekub
        }
    })
}

exports.getEkubtegnas = async (req, res) => {
    const {ekubsName, phoneNumber} = req.params
    let ekubtegnas, length

    try {
        const ekub = await Ekub.findOne({ekubsName})
        if(!ekub)
            throw new Error (`No ekub name called ${ekubsName}`)
        const ekubId = ekub._id.toString()

            // Find Ekubtegna with drawnEkub.Ekubs name and if exists, with phoneNumebr
        ekubtegnas = await Ekubtegna.find({
            'drawnEkubs': {$elemMatch: {ekubId}},
            phoneNumber: phoneNumber || { $ne : null }
            }).sort({"drawnEkubs.winnerNumber": 1}).select("-__v -drawnEkubs._id -drawnEkubs.ekubId")
        length = ekubtegnas.length

        if(length == 0){
            throw new Error ("No User Found")
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            result: {
                msg: error.message || "Error while fetching Ekubtegna"
            }
        })

    }

    res.status(200).json({
        status: true,
        result: {
            length,
            msg: "ekubtegnas",
            data: ekubtegnas
        }
    })
}

exports.getMe = async(req, res) => {
    const user = req.user
    
    try {
        const ekubtegnaId = user._id.toString()
        const me = await Ekubtegna.findById(ekubtegnaId).select("-drawnEkubs._id -__v")
    
        // const ekubsId = me.drawnEkubs.map(obj => obj.ekubId.toString())
        // const myEkubs = await Ekub.find({_id: { $in: ekubsId} })
    
        res.status(200).json({
            status: true,
            result: {
                msg: `Ekubtegna ${user.name}`,
                data: me
            }
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            result: {
                msg: error.message,
                data: null
            }
        })
    }

}

exports.getMyStatus = async (req, res) => {


    res.status(200).json({
        status: true,
        result: {
            msg: ""
        }
    })
}

exports.payEkub = async (req, res) => {
    
    try {
        const { ekubsName, phoneNumber } = req.params
        if(!ekubsName || !phoneNumber)
            throw new Error("Ekub's Name or Phone Number is not specified")

        const ekub = await Ekub.findOne({ekubsName})
        if(!ekub)
            throw new Error("No Ekub with this name")

        const ekubId = ekub._id.toString()

        const findEkubFromEkubtegna = { phoneNumber, 'drawnEkubs' : { $elemMatch : {ekubId}}}
        const pushPayment = { $push : { 'drawnEkubs.$[].paidWeeks': 1}}
        
        const updatedEkubtegna = await Ekubtegna.findOneAndUpdate(findEkubFromEkubtegna, pushPayment, { returnDocument: 'after'}).select("-__v ")
        
        if(!updatedEkubtegna)
            throw new Error(`Ekubtegna using ${phoneNumber} is not found in ${ekubsName}`)

        res.status(200).json({
            status: true,
            result: {
                msg: `Ekubtegna has paid his ${updatedEkubtegna.drawnEkubs[0].paidWeeks.length}'s Week Payment`,
                data: updatedEkubtegna
            }
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            result: {
                msg: error.message,
                data: null
            }
        })
    }



}