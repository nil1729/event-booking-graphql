const Event = require('../../models/Event');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// !Population in MongoDB
const events = eventIDs => {
    return Event
        .find({
            _id: {
                $in: eventIDs
            }
        })
        .then(results => {
            return results.map(event => {
                return {
                    ...event._doc,
                    creator: user.bind(this, event.creator),
                    date: new Date(event.date).toISOString()
                };
            });
        })
        .catch(err => {
            console.log(err);
            throw new Error(err);
        })
};


const user = userID => {
    return User
        .findById(userID)
        .then(result => {
            return {
                ...result._doc,
                password: null,
                createdEvents: events.bind(this, result.createdEvents)
            };
        })
        .catch(err => {
            throw new Error(err);
        });
};


module.exports = {
    // ! All Events
    events: () => {
        return Event.find()
            .then(events => {
                return events.map(event => {
                    return {
                        ...event._doc,
                        creator: user.bind(this, event.creator),
                        date: new Date(event.date).toISOString()
                    }
                });
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    // !Create New Event
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
            creator: '5ef109ddcfa3520484a92c2d'
        });
        let createdEvent;
        return event
            .save()
            .then(result => {
                createdEvent = {
                    ...result._doc,
                    creator: user.bind(this, result.creator),
                    date: new Date(event.date).toISOString()
                };
                return User.findById('5ef109ddcfa3520484a92c2d');
            })
            .then(user => {
                if (!user) throw new Error('User Not Found');
                user.createdEvents.push(event);
                return user.save();
            })
            .then(result => {
                return createdEvent
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    },
    // !Create A New User
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
}