const express = require('express')
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const cors = require('cors');

const ItemType = require('./ItemType');

const TODOs = [
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

const ITEMs = [
    {
        "name": "jetpack",
        "price": 100
    },
    {
        "name": "jetpack v2",
        "price": 200
    }
];

const TodoType = new graphql.GraphQLObjectType({
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

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            todos: {
                type: new graphql.GraphQLList(TodoType),
                resolve: function () {
                    return TODOs;
                }
            },
            items: {
                type: new graphql.GraphQLList(ItemType),
                resolve: function () {
                    return ITEMs;
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

const port = 8081;

express()
    .use('/', cors(), graphqlHTTP({
        schema: new graphql.GraphQLSchema({
            query: queryType
        }),
        graphiql: true
    }))
    .listen(port, function (err) {
        console.log(`GraphQL Server is now running on localhost:${port}`);
    });
