const express = require('express')
const app = express()
const queryParser = require('express-query-int');
const port = 3000

app.use(queryParser());
app.use('/carro/', require('./controller/carros'))

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

app.listen(port, () => console.log(`Listening on port ${port}.`))
