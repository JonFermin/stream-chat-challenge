'use strict';

const express = require('express');
const serverless = require('serverless-http');
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var cors = require('cors');

var whitelist = ['http://localhost:3000']
var corsOptions = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

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



const app = express();

app.use(cors({origin: '*'}));

app.use(bodyParser.json())

const createConn = async () => {
    await client.connect();
    db = client.db(mongoDbName);
};

// curl --header "Content-Type: application/json" \
//   --request POST \
//   --data '{"user":"johndoe","uuid":"asdfsadfasdf"}' \
//   https://0fulre9arc.execute-api.us-east-1.amazonaws.com/dev/hello

app.post('/add-user', cors(corsOptions), async function (req, res) {
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
        res.json(await insertUser(req.body));
        return;
    } catch (e) {
        res.send({
            error: e.message,
        });
        return;
    }
});

const insertUser = async (body) => {
    const users = db.collection('users');

    const user = {
        id: body.uuid,
        name: body.user,
        image: body.image,
    };

    return {
        insertedUser: user,
        mongoResult: await users.insertOne(user),
    };
};

// curl --header "Content-Type: application/json" \
//   --request GET \
//   --data '{"user":"johndoe","uuid":"asdfsadfasdf"}' \
//   https://0fulre9arc.execute-api.us-east-1.amazonaws.com/dev/hello

app.get('/get-user/:userId', cors(corsOptions), async function (req, res) {
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
    try {
        res.json(await findUser(req.params));
        return;
    } catch (e) {
        res.send({
            error: e.message,
        });
        return;
    }
});

const findUser = async (params) => {
    const users = db.collection('users');
    return {
        mongoResult: await users.findOne(
            { 
                "id": params.userId
            }
        ,),
        test: JSON.stringify(params),
    };
};

module.exports = {
    app,
    user: serverless(app),
};