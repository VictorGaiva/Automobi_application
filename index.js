var MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const port = 3000


MongoClient.connect('mongodb://localhost:27017/automobi', function (err, client) {
    if (err) throw err

    /*var db = client.db('animals')
    db.collection('mammals').find().toArray(function (err, result) {
        if (err) throw err
        //
        console.log(result)
    })*/
    
    
    app.route('/')
        .get(function(req, res) {
            res.send("GET method")
        })
        .post(function(req, res) {
            res.send("POST method")
        })
        .put(function(req, res) {
            res.send("PUT method")
    })
    
    app.route('/carro/*')
        .get(function(req, res) {
            res.send("GET method")
        })
        .post(function(req, res) {
            res.send("POST method")
        })
        .put(function(req, res) {
            res.send("PUT method")
    })

    app.route('/')
        .get(function(req, res) {
            res.send("GET method")
        })
        .post(function(req, res) {
            res.send("POST method")
        })
        .put(function(req, res) {
            res.send("PUT method")
    })


    app.listen(port, () => console.log('Listening on port ${port}.'))
})