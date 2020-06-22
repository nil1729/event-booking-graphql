const mongoose = require('mongoose');
const config = require('config');
module.exports = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected ....');
    } catch (e) {
        console.log(e.message);
        console.log('Refused to Connect...')
    }
}