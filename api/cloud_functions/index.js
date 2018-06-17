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