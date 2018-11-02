"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var express = require('express');
var _a = require('apollo-server-express'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var highlights_1 = require("./lib/highlights");
// Construct a schema, using GraphQL schema language
var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Game {\n    homeTeam: String\n    awayTeam: String\n    homeGoals: Int\n    awayGoals: Int\n    homeWin: Boolean\n    arena: String\n    date: String\n    gameIsFinished: Boolean\n    requiredOvertime: Boolean\n    url: String\n  }\n\n  type Highlights {\n    day: String\n    games: [Game]\n  }\n\n\n  type Query {\n    fetchHighlights (Hello: String) : [Highlights]\n  }\n"], ["\n  type Game {\n    homeTeam: String\n    awayTeam: String\n    homeGoals: Int\n    awayGoals: Int\n    homeWin: Boolean\n    arena: String\n    date: String\n    gameIsFinished: Boolean\n    requiredOvertime: Boolean\n    url: String\n  }\n\n  type Highlights {\n    day: String\n    games: [Game]\n  }\n\n\n  type Query {\n    fetchHighlights (Hello: String) : [Highlights]\n  }\n"
    // Provide resolver functions for your schema fields
])));
// Provide resolver functions for your schema fields
var resolvers = {
    Query: {
        fetchHighlights: highlights_1.fetchHighlights
    }
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
var app = express();
server.applyMiddleware({ app: app });
app.listen({ port: 4000 }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:4000" + server.graphqlPath);
});
var templateObject_1;
