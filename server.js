require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const connectDB = require('./config/db');
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-Auth');
const cors = require('cors');
const path = require('path');

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

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
// !PORT Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(process.env.NODE_ENV);
	console.log(`Server started on port ${PORT}`);
});
