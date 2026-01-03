const { User } = require('../mongo/models');
const { generateToken } = require('../middleware/jwt');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        
        
        const user = await User.findOne({ email: userEmail }).select('+passwordHash');
        
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const match = await bcrypt.compare(password, user.passwordHash);
        
        if (!match) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = generateToken({ id: user._id });
        return res.status(200).json({
            authToken: token,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const signUp = async (req, res) => {
    try {
        const { userName, userEmail, password } = req.body;
        if(!userName || !userEmail || !password){
            return res.status(400).json({error:"bad data"});
        }
        console.log('beforedb');
        
        const user = await User.findOne({ email: userEmail });
        console.log('afterdb');
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const saltRounds = parseInt(process.env.SALT_LENGTH) || 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name: userName,
            email: userEmail,
            password: hash,
        });

        await newUser.save();
        
        const token = generateToken({ id: newUser._id });
        return res.status(200).json({
            authToken: token,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { login, signUp };