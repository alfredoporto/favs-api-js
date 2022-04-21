
const jwt = require('jsonwebtoken');
const {
    mongo: { usersModel },
} = require('../../persistance');
const {
    bcryptHelpers: { encryptPassword, comparePassword },
} = require('../../helpers');
const { jwtSecret } = require('../../config');

module.exports = {
    signUp: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email, password);
            const encryptedPassword = await encryptPassword(password);
            const newUser = new usersModel({ email, password: encryptedPassword });
            await newUser.save();
            res.send(`${newUser.email} registered`);
        } catch (error) {
            res.send(error.message);
        }
    },
    signIn: async (req, res) => {
        const { email, password } = req.body;
        const userFound = await usersModel.findOne({ email });
        if (!userFound) return res.send('User not registered');
        const isCorrectPassword = await comparePassword(
            password,
            userFound.password
        );
        if (!isCorrectPassword) return res.send('Password incorrect');
        const token = jwt.sign(JSON.stringify(userFound), jwtSecret);
        res.json({ message: `${userFound.email} welcome`, token, userFound });
    },
};