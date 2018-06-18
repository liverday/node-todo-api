const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server, cause: ', err);
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({text: 'Something to do', completed: false})
        .then((result) => {
            console.log(JSON.stringify(result.ops, undefined, 2));  
        }, (err) => {
            console.log('Unable to insert data, cause: ', err);
        });

    db.collection('Todos').insertMany([
        {text: 'Something to do with array - member 1', completed: false},
        {text: 'Something to do with array - member 2', completed: true}
    ]).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to insert data, cause: ', err);
    });

});