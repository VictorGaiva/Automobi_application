const MongoClient = require('mongodb').MongoClient
const express = require('express')
var router = express.Router()


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
        res.send("hey")
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
