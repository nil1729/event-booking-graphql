const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const connectDB = require('./config/db');
const graphQLSchema = require('./graphql/schema/index')
const graphQLResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-Auth');
const cors = require('cors');

// !Database Connect
connectDB();

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
    console.log('API is Cross Site accessible');
}

// !Body Parser Setup
app.use(express.json());

//! Middleware
app.use(isAuth);


// !Express GraphQL Setup
app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true,
    })
);

// !PORT Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});