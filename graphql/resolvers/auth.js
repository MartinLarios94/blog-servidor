const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    createUser: async args => {
        try {
            const findUser = await User.findOne({ email: args.userInput.email })
            if (findUser) {
                throw new Error('User exists already.')
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const saveUser = await user.save();

            return { ...saveUser._doc, password: null }
        }
        catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error('User does not exists.');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!')
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, `${process.env.SECRET_WORD}`, {
            expiresIn: '1h'
        });
        return { userId: user.id, token: token, tokenExpiration: 1 }

    }
}