const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/controlteam';


module.exports = () => {
    return new Promise((resolve,reject) => {
        MongoClient.connect(url,{useNewUrlParser:true}, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            return resolve(client.db("controlteam"));
        });
    });
}
