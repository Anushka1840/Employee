require("dotenv").config();
const { connectDB } = require("./config/db");
const { createApolloServer } = require("./server");

(async () => {
    await connectDB();

    const server = createApolloServer();

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
})();
