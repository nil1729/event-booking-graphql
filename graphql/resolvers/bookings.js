const Booking = require('../../models/Booking');
const Event = require('../../models/Event');
const {
    transformBooking,
    transformEvent
} = require('./merge');



module.exports = {
    // !All Bookings
    bookings: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Unauthenticated request');
            }
            const bookings = await Booking.find({
                user: req.userID
            }).sort({
                createdAt: -1
            });
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    //! Add Booking
    bookEvent: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Unauthenticated request');
            }
            let bookedEvent = await Booking.findOne({
                event: args.eventID,
                user: req.userID
            });
            if (bookedEvent) {
                throw new Error('You are already booked this event');
            }
            let ownedEvent = await Event.findOne({
                _id: args.eventID,
                creator: req.userID
            });
            if (ownedEvent) {
                throw new Error('You are the owner of this event');
            }
            bookedEvent = new Booking({
                event: args.eventID,
                user: req.userID
            });
            const result = await bookedEvent.save();
            return transformBooking(result);
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    //! Cancel Booking
    cancelBooking: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Unauthenticated request');
            }
            const booking = await Booking.findById(args.bookingID).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({
                _id: args.bookingID
            });
            return event;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}