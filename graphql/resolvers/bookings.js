const Booking = require('../../models/Booking');
const {
    transformBooking,
    transformEvent
} = require('./merge');



module.exports = {
    // !All Bookings
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    //! Add Booking
    bookEvent: async args => {
        try {
            const newBooking = new Booking({
                event: args.eventID,
                user: '5ef19bd82660c73370905ff7'
            });

            const result = await newBooking.save();
            return transformBooking(result);
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    //! Cancel Booking
    cancelBooking: async args => {
        try {
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