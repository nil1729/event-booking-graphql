const Event = require('../../models/Event');
const User = require('../../models/User');
const {
    dateToString
} = require('../../helpers/date');

//! Transform Booking Setup 
const transformBooking = booking => {
    return {
        ...booking._doc,
        user: creator.bind(this, booking.user),
        event: singleEvent.bind(this, booking.event),
        createdAt: dateToString(booking.createdAt),
        updatedAt: dateToString(booking.updatedAt)
    }
}

//! Transform Events Setup
const transformEvent = event => {
    return {
        ...event._doc,
        creator: creator.bind(this, event.creator),
        date: dateToString(event.date),
    }
}

// !Population in MongoDB
const events = async eventIDs => {
    try {
        const events = await Event.find({
            _id: {
                $in: eventIDs
            }
        });
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

const singleEvent = async eventID => {
    try {
        const event = await Event.findById(eventID);
        return transformEvent(event);
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

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

// exports.events = events;
// exports.creator = creator;
// exports.singleEvent = singleEvent;
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;