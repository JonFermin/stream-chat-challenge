'use strict';

const express = require('express');
const serverless = require('serverless-http');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')


// mongodb+srv://johndoe:<password>@stream-chat-auth-di9pf.mongodb.net/test?retryWrites=true

const mongoClusterName = 'stream-chat-auth-di9pf';
const mongoUser = 'admin';
const mongoDbName = 'main';
const mongoPass = 'admin';

const mongoConnStr = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoClusterName}.mongodb.net/${mongoDbName}?retryWrites=true`;

const client = new MongoClient(mongoConnStr, {
    useNewUrlParser: true,
});
let db;

const createConn = async () => {
    await client.connect();
    db = client.db(mongoDbName);
};

const performQuery = async (username, id) => {
    const users = db.collection('users');

    const user = {
        uuid: id,
        name: username,
        pass: 'n/A',
    };

    return {
        insertedUser: user,
        mongoResult: await users.insertOne(user),
        test: username + id,
    };
};

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.post('/hello', async function (req, res) {
    if (!client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
            await createConn();
        } catch (e) {
            res.json({
                error: e.message,
            });
            return;
        }
    }

    // Connection ready. Perform insert and return result.
    try {
        res.json(await performQuery(req.body.user, req.body.uuid));
        return;
    } catch (e) {
        res.send({
            error: e.message,
        });
        return;
    }
});

module.exports = {
    app,
    hello: serverless(app),
};