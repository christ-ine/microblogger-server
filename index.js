const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const { MONGO_URI } = require('./config.js')

const PORT = process.env.PORT || 5000


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) =>  ({ req })
})

mongoose
    .connect(MONGO_URI, { 
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true 
    })
    .then(() => {
        console.log(('MongoDB Connected'))
        return server.listen({ port: PORT })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.error(err)
    })

