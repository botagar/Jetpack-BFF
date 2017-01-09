const graphql = require('graphql');


const ItemType = new graphql.GraphQLObjectType({
    name: 'item',
    fields: function () {
        return {
            name: {
                type: graphql.GraphQLString
            },
            price: {
                type: graphql.GraphQLInt
            }
        }
    }
});


module.exports = ItemType;