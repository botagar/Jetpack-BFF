const express = require('express')
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

var TODOs = [
    {
        "id": 2739542,
        "title": "Read emails",
        "completed": false
    },
    {
        "id": 2740883,
        "title": "Buy orange",
        "completed": true
    }
];

var TodoType = new graphql.GraphQLObjectType({
    name: 'todo',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLInt
            },
            title: {
                type: graphql.GraphQLString
            },
            completed: {
                type: graphql.GraphQLBoolean
            }
        }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            todos: {
                type: new graphql.GraphQLList(TodoType),
                resolve: function () {
                    return TODOs;
                }
            },
            todoById: {
                type: TodoType,
                args: {
                    id: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
                    }
                },
                resolve: function (root, ref) {
                    return TODOs.filter(function (i) {
                        return i.id == ref.id
                    })[0];
                }
            }
        }
    }
});

express()
    .use('/', graphqlHTTP({
        schema: new graphql.GraphQLSchema({
            query: queryType
        }),
        graphiql: true
    }))
    .listen(8080, function (err) {
        console.log('GraphQL Server is now running on localhost:8080');
    });
