const {Ekub, Ekubtegna, BaleEkub} = require('./../DB/Schemas')


const sebsabi = function() {

}

sebsabi.prototype.checkAvailablePlace = async function(portion, ekubName, callback) {
    // const ekub = await Ekub.findOne({ekubName})

    const aggregated = await Ekubtegna.aggregate([
        {
            $lookup: {
                from: "Ekub",
                foreignField: "_id",
                localField: "drawnEkubs.ekubId",
                as: "Ekubs"
            }
        },
        // {
        //     $unwind: '$joined'
        // },
        {
            $match: {
                // "$drawnEkubs.ekubId": 
            }
        },
        {
            $group: {
                _id: {
                    EkubPortion: "$drawnEkubs.ekubPortion",
                    // EkubId: "$drawnEkubs.ekubId"
                },
                qty: { $sum: 1}
            }
        }
    ])




}