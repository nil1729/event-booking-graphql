const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


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
                throw new Error('Email already Registered');
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
    //! Login a User
    loginUser: async args => {
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
            if (!user) {
                throw new Error('Authentication Failed');
            }
            let isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Authentication Failed');
            }
            const token = await jwt.sign({
                userID: user.id,
                email: user.email
            }, config.get('jwtSecret'), {
                expiresIn: '1h'
            });
            return {
                userID: user.id,
                token: token,
            }
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
    validateAuth: async (args, req) => {
        try {
            return req.isAuth;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}