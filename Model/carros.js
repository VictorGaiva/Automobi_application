const MongoClient = require('mongodb').MongoClient
const express = require('express')
var router = express.Router()


//Root
router.route('/carro')
    .get(function(req, res) {
        if(!global.db) res.send("Erro interno")
        
        console.log(req.params)
        res.send("hello")
    })
    .post(function(req, res) {
        res.send("hello")
    })
    .put(function(req, res) {
        res.send("hello")
})

//Marcas ativas
router.route('/carro/marcasativas')
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
router.route('/carro/modelosativos')
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
router.route('/carro/versoesativas')
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
