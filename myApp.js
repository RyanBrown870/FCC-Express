

var express = require('express');
const bodyParser = require('body-parser');
var app = express();

const requestLogger = (req, res, next) => {
    const method = req.method;
    const path = req.path;
    const ip = req.ip;
    console.log(`` + method + ` ` + path + ` - ` + ip);
    next();
}

app.use(requestLogger);

process.env.MESSAGE_STYLE='uppercase';

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({ "message": "HELLO JSON" });
    } else{
      res.json({ "message": "Hello json" });  
    }
    
})


app.get('/', (req, res) => {
    res.send('Hello Express')
})

app.get(
    '/now', 
    (req, res, next) => {
    req.time = new Date().toString();
    next();
}, 
(req, res) => {
    res.send({ time: req.time })
})

app.get('/:word/echo', (req, res) => {
    res.send({ echo: req.params.word })
})

app.get('/name', (req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    const name = `` + firstName + ` ` + lastName
    res.json({ name });
})






























 module.exports = app;
