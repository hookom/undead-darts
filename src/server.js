var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');

var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/api/changelog', (req, res) => {
    db.getChangelog();
})

app.get('/api/stats/:season', (req, res) => {
    db.getStats(req.query.season);
})

app.post('/api/stats/update', (req, res) => {
    db.updateStat(req.body)
})

app.listen(port, () => console.log(`Listening on port ${port}`));