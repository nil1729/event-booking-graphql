const {
    buildSchema
} = require('graphql');

module.exports = buildSchema(`
        type Booking {
            _id: ID!,
            event: Event!,
            user: User!,
            createdAt: String!,
            updatedAt: String!,
        }

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]!
        }

        type AuthData {
            userID: ID!
            token: String!
        }
        
        input UserInput {
            email: String!
            password: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
            bookings: [Booking!]!
            loginUser(userInput: UserInput!): AuthData!
            validateAuth: Boolean!
        }

        type RootMutation {
            createEvent(eventInput: EventInput!): Event!
            createUser(userInput: UserInput!): User!
            bookEvent(eventID: ID!): Booking!
            cancelBooking(bookingID: ID!): Event!
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);