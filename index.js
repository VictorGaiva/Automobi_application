const express = require('express')
const app = express()
const queryParser = require('express-query-int');
const bodyParser = require('body-parser')

const port = 3000

app.use(bodyParser.json());
app.use(queryParser());

app.use('/carro/', require('./controller/carros'))

//Default route. Used only for testing
app.route('/')
.all(function(req, res) {
    res.status(400).send("<div>Bad request</div>")
})

app.listen(port, () => console.log(`Listening on port ${port}.`))
