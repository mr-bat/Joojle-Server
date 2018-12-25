const jwtDecode = require('jwt-decode');
const jwt       = require('jsonwebtoken');
const User      = require('../models/User');

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
    let email = req.body.email;
    try {
        let user = await User.findOne({email});
        // TODO: set cookie
        if(user) {
            let token = jwt.sign({
                uid: user._id.toString()
            }, "SuperSecret", {
                expiresIn: "10d" // expires in 24 hours
            });
            res.header('token', token).redirect('http://localhost:3001/hompage.html');
            // res.json({
            //     success: true,
            //     message: 'Enjoy your token!',
            //     token: token,
            // });
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
