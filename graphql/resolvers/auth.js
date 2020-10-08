const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

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
                if (!validator.isEmail(email)) {
                    throw new Error('Email is not valid');
                }
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
            }, process.env.JWT_SECRET, {
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
    loadUser: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Session Expired, Kindly login now');
            }
            const user = await User.findOne({
                _id: req.userID
            }, {
                password: 0
            });
            return user;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}