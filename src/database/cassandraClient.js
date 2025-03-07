const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['localhost'], 
    localDataCenter: 'datacenter1',
    keyspace: 'mi_keyspace',
});

module.exports = client;