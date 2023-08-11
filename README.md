# Ekub-Debter
__Ekub Debter__ is a system that aims to replace __only__ the manual book keeping and winner notification process of traditional __Ethiopian Ekub__ /Insurance/.

Endpoints information for API Call

***POST*** **/AddEkubtegna**: Adds the specified Ekubtegna to the database
    The Request Body 
        {
            "name" : "Ayele Kebede",        //required
            "phoneNumber" : "0935344088"    // Phone number of every Ekubtegna is unique
        }

        The default password of the users is their phone number

        if drawnEkub object is specified, 
        {
            "name" : "Ayele Kebede",
            "phoneNumber" : "0935344088",
            "drawnEkubs": {
                "ekubName": "Bun'gn",                   // required
                "ekubId": "64d2aa41aa5706831db096ed"    // mongooseId (optional)
                "winnerNumber": 42                      // required   
                "ekubPortion": "half"                   // requried
            }
        }

    *The API returns a JSON object containing the following fields.*
    {
        status: true/false,
        result: {
            msg: "message from the system",
            data: {
                Ekubtegna's Schema 
            } / null
        }
    }
    with statusCode (200) / (400)


***GET***
    **/GetEkubtegnas/:ekubsName/:phoneNumber?**
        *The API returns a JSON object containing the following fields.*
        {
            "status": true,
            "result": {
                "length": 10,                        // The number of Ekubtegnas in the specified ekubsName &| phoneNumber
                "msg": "ekubtegnas",
                "data": [                            // Array of Ekubtegnas
                    {
                        "_id": "64d5e42a75869576e8bcf603",
                        "name": "Dawit",
                        "phoneNumber": "0984d8f24f",
                        "drawnEkubs": [
                            {
                                "winnerNumber": 3,
                                "paidWeeks": [1, 2, 3, 4],
                                "ekubPortion": "full"
                            }
                        ]
                    },
                    {
                        "_id": "64d50786fbb3d801ae2b359f",
                        "name": "Tigst",
                        "phoneNumber": "0920741377",
                        "drawnEkubs": [
                            {
                                "winnerNumber": 31,
                                "paidWeeks": [1, 4, 5, 10],
                                "ekubPortion": "full"
                            }
                        ]
                    }
                ]
            }
        }


    **/me**: gets users status

    *The API returns a JSON object containing the following fields.*
        {
            status: true/false
            result: {
                msg: "Ekubtegna's current status"
                data: {
                    name: "Ayele Kebede",
                    phoneNumber: "09123456789"
                    drawnEkubs: [{
                        ekubsName: "Bun'gn",
                        winnerNumber: 32,
                        paidWeeks: [1,2,4,5,8,10...],
                        ekubPortion: "half"
                        <!-- ekubId: "64d2aa41aa5706831db096ef", -->
                        <!-- currentWeek: 4, -->
                        <!-- numberOfWeeks: 200, -->
                        <!-- amountOfMoney: 2000, -->
                    }] 
                }             // Returns Array of Ekubs that the Ekubtegna has registered
            }
        }


**/payEkub/:ekubsName/  :phoneNumber** : Update Payment Status  <!-- Week? -->

