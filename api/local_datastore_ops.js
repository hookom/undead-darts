const Datastore = require('@google-cloud/datastore');

let datastore = new Datastore({
    projectId: 'undead-darts-1',
//    keyFilename: '../../undead-darts-1-b5b234a87fce.json'
});

let query = datastore
  .createQuery('Changelog')
  .order('timestamp', {
    descending: true,
  })
  .limit(2);

datastore.runQuery(query).then(results => {
  let changelog = [];
  console.log('Changelog:');
  results[0].forEach(row => changelog.push({message: row.message, timestamp: row.timestamp}));
	console.log(changelog)
});
