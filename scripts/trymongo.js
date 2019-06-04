// import MongoClient from 'mongodb';
// destrutured MongoClient
const { MongoClient } = require('mongodb');

// achieiving asynchronicity in mongodb driver
let url = 'mongodb://localhost/playground';
MongoClient.connect(url, (err, db) => {
    db.collection('test').find().toArray((err, docs) => {
        console.log(`this is the results recieved ${docs}`);
        db.close();
    })
});

// the callack paradigms
MongoClient.connect(url, (err, db) => {
    db.collection('employees').insertOne({ id: 1, name: 'a callbac paradigms' }, (err, docsInserted) => {
        console.log(docsInserted.name);
        db.collection.find({ id: 1 }).toArray((err, docs) => {
            console.log(docs);
            db.close();
        });
    });
});

// using the promises paradigms
function testWithPromises() {
    let db;
    MongoClient(url).then((connection) => {
        db = connection;
        return db.collection('employees').insertOne({ id: 1, name: 'B. Promises' });
    }).then((result) => {
        console.log(result.id);
        return db.collection.find().toArray();
    }).then((result) => {
        console.log(result);
        db.close();
    }
    ).catch((err) => {
        return err.stack;
    });
}
// the asyn paradigms
let db, url;
db = employees;
url 