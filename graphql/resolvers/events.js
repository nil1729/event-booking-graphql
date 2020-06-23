const Event = require('../../models/Event');

const {
    transformEvent
} = require('./merge');


module.exports = {
    //! All Events
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
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
                creator: '5ef19bd82660c73370905ff7'
            });
            let createdEvent;
            event = await event.save();
            createdEvent = transformEvent(event);
            let user = await User.findById('5ef19bd82660c73370905ff7');
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