const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const _ = require('lodash');


const port = process.env.PORT || 3000
var server = express();

server.use(bodyParser.json());
server.post('/todos', (req, res) => {
    var todo = new Todo(_.pick(req.body, ['text', 'completed']));
    todo.save().then((doc) => {
        res.status(200).send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

server.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    })
});

server.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send({ code: 'ID_NOT_VALID', message: 'ID not valid, try again with a new one' })
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send({ code: 'ID_NOT_FOUND', message: 'ID not found, try again with a new one' })
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send({});
    })
});


server.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send({ code: 'ID_NOT_VALID', message: 'ID not valid, try again with a new one' })
    }
    Todo.findByIdAndRemove({ _id: new ObjectID(id) }).then((todo) => {
        if (!todo) {
            res.status(404).send({ code: 'ID_NOT_FOUND', message: 'Any document was deleted, we dont found the id specified' })
        }
        res.status(200).send({ todo });
    }).catch((e) => {
        res.status(400).send({});
    })
})
server.disable('etag');
server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

server.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        res.status(404).send({ code: 'ID_NOT_VALID', message: 'ID not valid, try again with a new one' })
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if(!todo) {
            res.status(400)({ code: 'ID_NOT_FOUND', message: 'Any document was updated, we dont found the id specified' });
        }
        res.status(200).send({ todo })
    }).catch((e) => {
        res.status(400).send({});
    });
})

server.post('/users', (req, res) => {
    var user = new User(_.pick(req.body, ['email', 'password']));
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header("x-auth", token).send(user)
    }).catch((e) => {
        res.status(400).send(e);
    })
})

module.exports = { server };