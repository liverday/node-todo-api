const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server, cause: ', err);
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');

    db.collection('Users').deleteMany({name: 'Junior'}).then((result) => {
        console.log(result);  
    });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b26fc0cbc2fbf374d25343f')}).then((result) => {
        console.log(result);
    });

});