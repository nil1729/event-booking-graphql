const Event = require('../../models/Event');
const User = require('../../models/User');

const {
    transformEvent
} = require('./merge');


module.exports = {
    //! All Events
    events: async () => {
        try {
            const events = await Event.find().sort({
                createdAt: -1
            });
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    // !Create New Event
    createEvent: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Unauthenticated request');
            }
            const {
                eventInput: {
                    title,
                    description,
                    price,
                    date
                },
            } = args;

            let event = new Event({
                title: title,
                description: description,
                price: price,
                date: new Date(date),
                creator: req.userID
            });
            let createdEvent;
            event = await event.save();
            createdEvent = transformEvent(event);
            let user = await User.findById(req.userID);
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
}