const Datastore = require('@google-cloud/datastore');

exports.getChangelog = (req, res) => {
    let datastore = new Datastore({
        projectId: 'undead-darts-1'
    });

    let query = datastore
        .createQuery('Changelog')
        .order('timestamp', {
            descending: true,
        })
        .limit(20);

    datastore.runQuery(query).then(results => { 
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        res.send(results[0]);
    });
};

exports.getChangelogTest = (req, res) => {
    let datastore = new Datastore({
        projectId: 'undead-darts-1'
    });

    let query = datastore
        .createQuery('ChangelogTest')
        .order('timestamp', {
            descending: true,
        })
        .limit(20);

    datastore.runQuery(query).then(results => { 
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        res.send(results[0]);
    });
};

exports.getStats = (req, res) => {
    let datastore = new Datastore({
        projectId: 'undead-darts-1'
    });

    let query = datastore
        .createQuery('PlayerStat')
        .filter('season', '=', req.query.season);

    datastore.runQuery(query).then(results => { 
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        res.send(results[0]);
    });
};

exports.getStatsTest = (req, res) => {
    let datastore = new Datastore({
        projectId: 'undead-darts-1'
    });

    let query = datastore
        .createQuery('PlayerStatTest')
        .filter('season', '=', req.query.season);

    datastore.runQuery(query).then(results => { 
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        res.send(results[0]);
    });
};

exports.getSeasons = (req, res) => {
    let datastore = new Datastore({
        projectId: 'undead-darts-1'
    });

    let query = datastore
        .createQuery('PlayerStat')
        .groupBy(['season']);

    datastore.runQuery(query).then(results => { 
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        res.send(results[0].map(row => row.season));
    });
};

exports.getSeasonsTest = (req, res) => {
    let datastore = new Datastore({
        projectId: 'undead-darts-1'
    });

    let query = datastore
        .createQuery('PlayerStatTest')
        .groupBy(['season']);

    datastore.runQuery(query).then(results => { 
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        res.send(results[0].map(row => row.season));
    });
};