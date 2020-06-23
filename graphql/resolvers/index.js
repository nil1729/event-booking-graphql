const authResolver = require('./auth');
const eventResolver = require('./events');
const bookingResolver = require('./bookings');

const rootResolver = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver
};

module.exports = rootResolver;