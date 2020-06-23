const User = require('../../models/User');
const bcrypt = require('bcrypt');


module.exports = {
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
    }
}