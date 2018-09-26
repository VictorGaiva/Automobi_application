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
router.route('/marcasativas')
    .get(function(req, res) {
        dataBase('marcasativas', function (db, connection) {
            db.collection('marcasativas').find({}).toArray(function(err, result) {
                if (err) throw err
                res.send(result)
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


//Modelos ativos
router.route('/modelosativos')
    .get(function(req, res) {
        res.send(req.body)
    })
    .post(function(req, res) {
        res.send(req.body)
    })
    .put(function(req, res) {
        res.send(req.body)
})

//Versoes ativas
router.route('/versoesativas')
    .get(function(req, res) {
        res.send(req.body)
    })
    .post(function(req, res) {
        res.send(req.body)
    })
    .put(function(req, res) {
        res.send(req.body)
})

module.exports = router
