var fs = require('fs');
var ini = require('ini');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'hostname',
    user: 'username',
    password: 'password',
    database: 'zombies'
});

exports.getChangelog = () => {
    connection.query(`SELECT * FROM \`changelog-test\` ORDER BY timestamp DESC LIMIT 20`, (error, results, fields) => {
        if (error) throw error;
        console.log('results', results);
        console.log('feilds', feilds);
        // res.send(results);
    })
}

exports.getStats = (season) => {
    connection.query(`SELECT * FROM stats-test WHERE season='${season}'`, (error, results, fields) => {
        if (error) throw error;
        console.log('results', results);
        console.log('feilds', fields);
        // res.send(results);
    });
}

exports.updateStat = (request) => {
    const name = request.name;
    const feild = request.feild;
    const value = request.value;
    const season = request.season;
    const timestamp = request.timestamp;
    const change = request.change;

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
};
