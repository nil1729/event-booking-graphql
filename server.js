const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// !Body Parser Setup
app.use(express.json());

// !Express GraphQL Setup
app.use(
	'/graphql',
	graphqlHTTP({
		schema: buildSchema(`
            type RootQuery {
                events: [String!]!
            }

            type RootMutation {
                createEvent(name: String!): String!
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
		rootValue: {
			events: () => {
				return ['Avengers', 'Iron Man', 'Ant Man'];
			},
			createEvent: args => {
				const EventName = args.name;
				return EventName;
			},
		},
		graphiql: true,
	})
);

// !PORT Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
