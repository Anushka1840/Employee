const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

function createApolloServer() {
    return new ApolloServer({
        typeDefs,
        resolvers,
        formatError: (err) => {
            console.error("GraphQL Error:", err);
            return err;
        },
    });
}

module.exports = { createApolloServer };
