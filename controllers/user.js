const User = require('../models/User');

const signUp = async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;

    let user = new User({
        username,
        email
    });

    try {
        await user.save();
        res.send({
            success: true,
            message: 'User has been added successfully.',
            user
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};

const signIn = async (req, res, next) => {
    let username = req.body.username;
    try {
        let user = await User.findOne({username});
        // TODO: set cookie
        if(user) {
            res.send({
                success: true,
                user
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'User not found.'
            })
        }
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};

module.exports = {
    signUp,
    signIn
};