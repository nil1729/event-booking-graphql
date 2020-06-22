const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const {
    buildSchema
} = require('graphql');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const Event = require('./models/Event');
const User = require('./models/User');

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

            type User {
                _id: String!
                email: String!
                password: String
            }

            input UserInput {
                email: String!
                password: String!
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
                createUser(userInput: UserInput): User!
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            events: () => {
                return Event.find()
                    .then(events => {
                        return events;
                    })
                    .catch(err => {
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
                    price: price,
                    creator: '5ef0fd3d21101f1dd05aa2ba'
                });
                let createdEvent;
                return event
                    .save()
                    .then(result => {
                        createEvent = result;
                        return User.findById('5ef0fd3d21101f1dd05aa2ba');
                    })
                    .then(user => {
                        if (!user) throw new Error('User Not Found');
                        user.createdEvents.push(event);
                        return user.save();
                    })
                    .then(result => {
                        return createEvent;
                    })
                    .catch(err => {
                        console.log(err);
                        throw new Error(err);
                    });
            },
            createUser: args => {
                const {
                    userInput: {
                        email,
                        password
                    },
                } = args;
                return User
                    .findOne({
                        email
                    })
                    .then((user) => {
                        if (user) throw new Error('User Exists already.');
                        else {
                            return bcrypt
                                .hash(password, 10)
                                .then(hashedPassword => {
                                    const user = new User({
                                        email,
                                        password: hashedPassword,
                                    });
                                    return user
                                        .save()
                                        .then(result => {
                                            return {
                                                ...result._doc,
                                                password: null
                                            }
                                        });
                                });
                        }
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