var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// API Schema
var schema = buildSchema(`
  type gameDataObj {
      gameID: String!
      dataObj: String
  }
  type Query {
    getGameDataObj(gameID: String!): gameDataObj
  }

  input gameDataObjInput {
      gameID: String
      dataObj: String
  }

  type Mutation {
      createGameDataObj(input: gameDataObjInput): gameDataObj
      updateGameDataObj(gameID: String!, input: gameDataObjInput): gameDataObj
  }
`);

var fakeDatabase = {
    100: {
      gameID: 100,
      dataObj: '{"objectCost":{"farm":{"gold":13,"wood":11,"stone":7,"metal":0},"logger":{"gold":20,"wood":10,"stone":5,"metal":0},"stone":{"gold":30,"wood":10,"stone":5,"metal":5},"iron":{"gold":50,"wood":20,"stone":15,"metal":5}},"objectLevel":{"farm":3,"logger":1,"stone":1,"iron":1},"playerResources":{"gold":3400,"wood":1,"stone":4,"metal":10}}',
    },
  };

// Endpoint Resolver
var root = {
  getGameDataObj: ({gameID}) => {
    if (!fakeDatabase[gameID]) {
        throw new Error('no game exists with gameID ' + gameID);
    }
    return fakeDatabase[gameID];
  },
  createGameDataObj: ({input}) => {
    var gameID = require('crypto').randomBytes(10).toString('hex');
    input.gameID = gameID;
    let obj = JSON.parse(unescape(input.dataObj));
    console.log(obj);
    fakeDatabase[gameID] = input;
    return fakeDatabase[gameID];
  },
  updateGameDataObj: ({gameID, input}) => {
    if (!fakeDatabase[gameID]) {
        throw new Error('no game exists with gameID ' + gameID);
    }
    fakeDatabase[gameID] = input;
    return fakeDatabase[gameID];
  },
}
var app = express();

app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

app.use('/api', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
}));

app.listen(4000);
console.log('Running Siedler-von-Aplerbeck API server at localhost:4000/api');