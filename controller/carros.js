const MongoClient   = require('mongodb').MongoClient
const MongoID       = require('mongodb').ObjectId
const express       = require('express')
const Joi           = require('joi')

let router = express.Router()


// C = Done
// E = 
// V = Done
// L = Done
// D =

let schema = {
    "marcasativas":{
        'N': Joi.string().min(1).required(),
        'C': Joi.number().min(1).required()
    },
    "versoesativas":{
        'Id': Joi.number().min(0).required(),
        'Nome': Joi.string().min(5).required(),
        'Count': Joi.number().min(0).required(),
        'NomeAmigavel': Joi.string().min(5).required()
    },
    "modelosativos":{
        'N': Joi.string().min(1).required(),
        'C': Joi.number().min(1).required()
    }
}

let dataBase = (collection, func) => {
    MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser: true} , function (err, connection) {
        if (err) throw err
        func(connection.db('test'), connection)
    })
}

const validateID = (idString) =>{
    let id
    //Create the ID variable
    try {
        id = MongoID(idString)
    } catch (error) {
        return null
    }
    return id
}

//Root
router.route('/').all(function(req, res) {
    res.status(400).send("<div>Bad request</div>")
})

//
router.route('/:collection')
    //List
    .get(function(req, res) {
        dataBase(req.params.collection, function (db, connection) {
            db.collection(req.params.collection).find(req.query).toArray(function(err, result) {
                if (err) throw err
                res.send(result)
                console.log(req.query)
                connection.close()
            })
        })
    })

    //Create
    .post(function(req, res) {
        dataBase(req.params.collection, function (db, connection) {
            //Check if data is ok

            const valid = Joi.validate(req.body, schema[req.params.collection])
 
            if(!valid.error){
                db.collection(req.params.collection).insertOne(req.body, function(err, result) {
                    if (err) throw err
                    res.send("Data added to Database")
                    console.log(`Added data to DB. ID=${result.insertedId}`)
                    connection.close()
                })
            }
            else{
                const message = valid.error.details[0].message
                res.status(400).send(`${message}`)
                console.log(`Unable to add ${req.body}. Error: ${message}`)
                return false
            }
        })
    })
    .put(function(req, res) {
        dataBase(req.params.collection, function (db, connection) {
            //Check if data is valid
            const valid = Joi.validate(req.body, schema[req.params.collection])
            

            if(!valid.error){
                //Check if the ID is set
                if(!req.query.id){
                    res.status(400).send("Updating data must be done by quering it using its ID.")
                    connection.close()
                }

                //Validate the ID field
                let id = validateID(req.query.id)
                if (!id){
                    res.status(400).send('ID field is invalid.')
                    console.log(`Update with invalid ID "${req.query.id}"`)
                    connection.close()
                    return
                }

                //Check if data already exists on database
                db.collection(req.params.collection).findOne({_id:id}, function(err, result) {
                    if (err) throw err
                    else if(result){
                        //If it does, update it
                        db.collection(req.params.collection).updateOne({_id:id}, {$set:req.body}, function(err, result) {
                            if (err) throw err
                            res.send(result)
                            console.log(`Updated data to DB. ID=${result}`)
                            connection.close()
                        });
                    }
                    else{
                        //If it doesn't, inform the user
                        res.status(404).send("Item not found.")
                        console.log(err, result)
                    }
                    connection.close()
                })
            
                
            }
            else{
                //Get the error message
                const message = valid.error.details[0].message
                //inform the client about the error
                res.status(400).send(`${message}`)
                console.log(`Unable to update ${req.body}. Error: ${message}`)
                connection.close()
            }
        })
    })
    .delete(function(req, res) {
        dataBase(req.params.collection, function (db, connection) {
            //Check if data is valid
            const valid = Joi.validate(req.body, schema[req.params.collection])
            

            if(!valid.error){
                //Check if the ID is set
                if(!req.query.id){
                    res.status(400).send("Deleting data must be done by quering it using its ID.")
                    connection.close()
                }

                //Validate the ID field
                let id = validateID(req.query.id)
                if (!id){
                    res.status(400).send('ID field is invalid.')
                    console.log(`Delete with invalid ID "${req.query.id}"`)
                    connection.close()
                    return
                }

                //Check if data exists on database
                db.collection(req.params.collection).findOne({_id:id}, function(err, result) {
                    if (err) throw err
                    else if(result){
                        //If it does, delete it
                        db.collection(req.params.collection).deleteOne({_id:id}, function(err, result) {
                            if (err) throw err
                            res.send(result)
                            console.log(`Item removed. ID=${result}`)
                            connection.close()
                        });
                    }
                    else{
                        //If it doesn't, inform the user
                        res.status(404).send("Item not found.")
                        console.log(err, result)
                    }
                    connection.close()
                })
            
                
            }
            else{
                //Get the error message
                const message = valid.error.details[0].message
                //inform the client about the error
                res.status(400).send(`${message}`)
                console.log(`Unable to delete ${req.body}. Error: ${message}`)
                connection.close()
            }
        })
})


//View
router.route('/:collection/:id').get(function(req, res) {
    dataBase(req.params.collection, function (db, connection) {
        //Validate the ID field
        let id = validateID(req.params.id)

        if (!id){
            res.status(400).send('ID field is invalid.')
            console.log(`Querry with invalid ID "${req.params.id}"`)
            connection.close()
            return
        }
        
        //Check if data already exists on database
        db.collection(req.params.collection).findOne({_id:id}, function(err, result) {
            if (err) throw err
            else if(result){
                //If it does, send the object to the user
                res.send(result)
                console.log(result)
            }
            else{
                //If it doesn't, inform the user
                res.status(404).send("Item not found.")
                console.log(err, result)
            }
            connection.close()
        })
    })
})
module.exports = router
