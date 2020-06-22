const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// !Body Parser Setup
app.use(express.json());

// !HardCoded Data
const events = [];

// !Express GraphQL Setup
app.use(
	'/graphql',
	graphqlHTTP({
		schema: buildSchema(`
            type Event {
                _id: String!
                title: String!
                description: String!
                price: Float!
                Date: String!
            }

            input EventInput {
                title: String!
                description: String!
                price: Float!
            }

            type RootQuery {
                events: [Event!]!
            }

            type RootMutation {
                createEvent(eventInput: EventInput): Event!
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
		rootValue: {
			events: () => {
				return events;
			},
			createEvent: args => {
				const {
					eventInput: { title, description, price },
				} = args;

				const event = {
					title: title,
					description: description,
					price: price,
					_id: Math.random().toString(),
					Date: new Date().toISOString(),
				};
				events.push(event);
				return event;
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
