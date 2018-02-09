const express = require('express');
const fs = require('fs');
const ini = require('ini');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Not sure how to determine this based on how the php stuff is doing it
// if (runningLocal) {
// var config = ini.parse(fs.readFileSync('localsomething'))
// } else {
var config = ini.parse(fs.readFileSync('/../../config.ini', 'utf-8'))
// }

var connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.dartsdb
});

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/api/changelog', (req, res) => {
    console.log(connection)
    connection.query(`SELECT * FROM \`changelog-test\` ORDER BY timestamp DESC LIMIT 20`, (err, results, fields) => {
        if (err) throw error;
        console.log('results', results);
        console.log('feilds', feilds);
        // res.send(results);
    })
    connection.release()
})

app.get('/api/stats/:season', (req, res) => {
    const season = req.query.season;

    connection.query(`SELECT * FROM stats-test WHERE season='${season}'`, (error, results, fields) => {
        if (error) throw error;
        console.log('results', results);
        console.log('feilds', fields);
        // res.send(results);
    });
    connection.release();
})

app.post('/api/stats/update', (req, res) => {
    const name = req.body.name;
    const feild = req.body.feild;
    const value = req.body.value;
    const season = req.body.season;
    const timestamp = req.body.timestamp;
    const change = req.body.change;

    // Update stats table
    connection.query(`UPDATE \`stats-test\` SET ${field}='${value} + ' WHERE name='${name}' AND season=${season}'`, (error, results, feilds) => {
        if (error) throw error;
        console.log('results', results);
        console.log('feilds', feilds);
    });

    // Update changelog table
    connection.query(`INSERT INTO \`changelog-test\` VALUES ('${change}', ${timestamp}')`, (error, result, feilds) => {
        if (error) throw error;
        console.log('results', results);
        console.log('fields', feilds);
    });

    connection.release();
})

app.listen(port, () => console.log(`Listening on port ${port}`));