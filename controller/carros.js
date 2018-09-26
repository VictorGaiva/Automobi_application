const MongoClient   = require('mongodb').MongoClient
const express       = require('express')
const Joi           = require('joi')

let router = express.Router()


// C = 
// E = 
// V = Done
// L = Done

const schema = {
    "marcasativas":{
        N: Joi.string().min(1).required(),
        C: Joi.number().min(1).required()
    },
    "versoesativas":{
        Id: Joi.number().min(0).required(),
        Nome: Joi.string().min(5).required(),
        Count: Joi.number().min(0).required(),
        NomeAmigavel: Joi.string().min(5).required()
    },
    "modelosativos":{
        N: Joi.string().min(1).required(),
        C: Joi.number().min(1).required()
    }
}

let dataBase = (collection, func) => {
    MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser: true} , function (err, connection) {
        if (err) throw err
        func(connection.db('test'), connection)
    })
}

let validateData = (data, collection) => {
    const result = Joi.validate(data, schema[collection])
    
    if (result){
        res.status(400).send(result.error)
        console.log(result)
        connection.close()
        return false
    }
    return true
}

//Root
router.route('/').all(function(req, res) {
    res.status(400).send("<div>Bad request</div>")
})

//Marcas ativas
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
            const isValid = validateData(req.body, req.params.collection)
            
            if(isValid){

            }
        })
    })
    .put(function(req, res) {
        res.send("hey")
    })
    .delete(function(req, res) {
        res.send("hey")
})


//View
router.route('/:collection/:id').get(function(req, res) {
    dataBase(req.params.collection, function (db, connection) {
        db.collection(req.params.collection).findOne(req.query, function(err, result) {
            if (err) throw err
            res.send(result)
            console.log(req.query)
            connection.close()
        })
    })
})
module.exports = router
