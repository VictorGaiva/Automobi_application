const MongoClient = require('mongodb').MongoClient
const express = require('express')
let router = express.Router()


let dataBase = (collection, func) => {
    MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser: true} , function (err, connection) {
        if (err) throw err
        func(connection.db('test'), connection)
    })
}

let validateJson = (schema, data) => {

}

//Root
router.route('/')
    .get(function(req, res) {
        res.send("hello")
    })
    .post(function(req, res) {
        res.send("hello")
    })
    .put(function(req, res) {
        res.send("hello")
})

//Marcas ativas
router.route('/:collection')
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
    .post(function(req, res) {
        res.send("hey")
    })
    .put(function(req, res) {
        res.send("hey")
})
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
