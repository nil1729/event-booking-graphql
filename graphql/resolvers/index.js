const Event = require('../../models/Event');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// !Population in MongoDB
const events = async eventIDs => {
    try {
        const events = await Event.find({
            _id: {
                $in: eventIDs
            }
        });
        return events.map(event => {
            return {
                ...event._doc,
                creator: creator.bind(this, event.creator),
                date: new Date(event.date).toISOString()
            };
        });
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};


const creator = async userID => {
    try {
        const user = await User.findById(userID);
        return {
            ...user._doc,
            password: null,
            createdEvents: events.bind(this, user.createdEvents)
        };
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};


module.exports = {
    // ! All Events
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return {
                    ...event._doc,
                    creator: creator.bind(this, event.creator),
                    date: new Date(event.date).toISOString()
                }
            });
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    // !Create New Event
    createEvent: async args => {
        try {
            const {
                eventInput: {
                    title,
                    description,
                    price
                },
            } = args;

            let event = new Event({
                title: title,
                description: description,
                price: price,
                creator: '5ef109ddcfa3520484a92c2d'
            });
            let createdEvent;
            event = await event.save();
            createdEvent = {
                ...event._doc,
                creator: creator.bind(this, event.creator),
                date: new Date(event.date).toISOString()
            };
            let user = await User.findById('5ef109ddcfa3520484a92c2d');
            if (!user) {
                throw new Error('User not found');
            }
            user.createdEvents.push(event);
            await user.save();
            return createdEvent;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    // !Create A New User
    createUser: async args => {
        try {
            const {
                userInput: {
                    email,
                    password
                },
            } = args;
            let user = await User.findOne({
                email
            });
            if (user) {
                throw new Error('User Exists already.');
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                user = new User({
                    email,
                    password: hashedPassword,
                });
                user = await user.save();
                return {
                    ...user._doc,
                    password: null
                }
            }
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
}