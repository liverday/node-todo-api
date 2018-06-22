var express = require('express');
var bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


const port = process.env.PORT || 3000
var server = express();

server.use(bodyParser.json());
server.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

server.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    })
})

server.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send({ code: 'ID_NOT_VALID', message: 'ID not valid, try again with a new one' })
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send({ code: 'ID_NOT_FOUND', message: 'ID not found, try again with a new one' })
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send({});
    })
})

server.disable('etag');
server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { server };