const Datastore = require('@google-cloud/datastore');
const fs = require('fs');

let datastore = new Datastore({
    projectId: 'undead-darts-1'
});

var lines = fs.readFileSync('stats','utf8').split('\n');

lines.forEach(row => {
    let cols = row.split(' ');

    let data = {
        name: cols[4].substr(2, cols[4].length-4), 
        season: cols[5].substr(1, cols[5].length -3 ),
        statversion: cols[6].substr(1, cols[6].length -3 ),
        zombiewins: parseInt(cols[7].substr(0, cols[7].length -1 )),
        human: parseInt(cols[8].substr(0, cols[8].length -1 )),
        survivor: parseInt(cols[9].substr(0, cols[9].length -1 )),
        coweringdefeat: parseInt(cols[10].substr(0, cols[10].length -1 )),
        resdhuman: parseInt(cols[11].substr(0, cols[11].length -1 )),
        lostbulls: parseInt(cols[12].substr(0, cols[12].length -1 )),
        catches: parseInt(cols[13].substr(0, cols[13].length -1 )),
        firstrdkill: parseInt(cols[14].substr(0, cols[14].length -1 )),
        firstrdelim: parseInt(cols[15].substr(0, cols[15].length -1 )),
        resdkill: parseInt(cols[16].substr(0, cols[16].length -1 )),
        doubletap: parseInt(cols[17].substr(0, cols[17].length -1 )),
        doublechomp: parseInt(cols[18].substr(0, cols[18].length -1 )),
        zombiehero: parseInt(cols[19].substr(0, cols[19].length -1 )),
        buffet: parseInt(cols[20].substr(0, cols[20].length -1 )),
        retaliation: parseInt(cols[21].substr(0, cols[21].length -1 )),
        flawlessfinish: parseInt(cols[22].substr(0, cols[22].length -1 )),
        multitalented: parseInt(cols[23].substr(0, cols[23].length -1 )),
        bully: parseInt(cols[24].substr(0, cols[24].length -1 )),
        wagers: parseInt(cols[25].substr(0, cols[25].length -1 ))
    };

    let key = datastore.key(['PlayerStatTest', data.name+'-'+data.season]);
    datastore.insert({ key, data });
})
  
