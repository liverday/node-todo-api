const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server, cause: ', err);
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');

    db.collection('Todos').find({text: 'Something to do'}).toArray() // query with relative text - find all results with text like 'Something to do'
        .then((result) => {
            console.log(JSON.stringify(result, undefined, 2));  
        }, (err) => {
            console.log('Unable to insert data, cause: ', err);
        });

    db.collection('Todos').findOne({completed: false}).then((result) => { // query with relative text - find the first result with text like 'Something to do'
        console.log("\n" + JSON.stringify(result, undefined, 2));
    })

    db.collection('Todos').find({ _id: new ObjectID('5b26ef7739f53e0948dc8fb6') }).next().then((result) => { // query with unique id - find the result that contains the unique objectID
        console.log("\n" + JSON.stringify(result, undefined, 2));
    });
});