const MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()

const port = 3000

const Carros = require('./Model/carros')

MongoClient.connect('mongodb://localhost:27017/test', function (err, client) {
    if (err) throw err
    global.db = client.db('animals')
    /*db.collection('mammals').find().toArray(function (err, result) {
        if (err) throw err
        //
        console.log(result)
    })*/

    //Default route. Used only for testing
    app.route('/')
        .get(function(req, res) {
            res.send("Nothing to see here")
        })
        .post(function(req, res) {
            res.send("Nothing to add here")
        })
        .put(function(req, res) {
            res.send("Nothing to change here")
    })

    app.route('/carro/*').all(Carros)

})

app.listen(port, () => console.log(`Listening on port ${port}.`))
