const Datastore = require('@google-cloud/datastore');
const fs = require('fs');

let datastore = new Datastore({
    projectId: 'undead-darts-1'
});

var lines = fs.readFileSync('changelog','utf8').split('\n');

lines.forEach(row => {
    let cols = row.split(' ');
    let timestamp = cols[5] + ' ' + cols[6];
    timestamp = timestamp.substr(1, timestamp.length-4);
    let data = { message: cols[4].substr(2, cols[4].length-4), timestamp }
    datastore.insert({ key: datastore.key('ChangelogTest'), data });
})
  
