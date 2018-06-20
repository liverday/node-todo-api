const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server, cause: ', err);
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b26eaa2e5f667044494f0a3')
    }, {
            $set: {
                completed: true
            }
    }, {
        returnOriginal: false
    })
    .then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to insert data, cause: ', err);
    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b26ed5a1a1346164844de31')
    }, {
            $set: {
                name: 'Jen'
            },
            $inc: {
                age: 1
            }
            
    }, {
        returnOriginal: false
    })
    .then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to insert data, cause: ', err);
    });
});