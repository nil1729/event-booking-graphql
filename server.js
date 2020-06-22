const express = require('express');
const app = express();
const connectDB = require('./config/db');
const Event = require('./models/Event');
const graphqlHTTP = require('express-graphql');
const {
    buildSchema
} = require('graphql');

// !Database Connect
connectDB();

// !Body Parser Setup
app.use(express.json());

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
                date: String!
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
                return Event
                    .find()
                    .then(events => {
                        return events;
                    }).catch(err => {
                        console.log(err);
                        throw err;
                    });
            },
            createEvent: args => {
                const {
                    eventInput: {
                        title,
                        description,
                        price
                    },
                } = args;

                const event = new Event({
                    title: title,
                    description: description,
                    price: price
                });
                return event
                    .save()
                    .then(result => {
                        // console.log(result);
                        return result;
                    }).catch(err => {
                        console.log(err);
                        throw new Error(err);
                    });
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