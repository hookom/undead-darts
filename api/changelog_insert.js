const Datastore = require('@google-cloud/datastore');

let datastore = new Datastore({
    projectId: 'undead-darts-1'
});
  
datastore.insert({message: 'test', timestamp: '2018-01-26 13:57:30'});
