/**
 * Created by Mehran on 10/31/16.
 */
const jwt   = require("jsonwebtoken");
const User  = require('../models/User');

module.exports = async (req, res, next) => {
    console.log(req.cookies);
    let token = req.body.Authorization || req.query.Authorization || req.headers['authorization'] || req.cookies['token'];
    if (token) {
        token = token.split(" ")[1];
        jwt.verify(token, "SuperSecret", async (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: 'Access Denied.'
                });
            } else {
                try {
                    let user = await User.findOne({
                        _id: decoded.uid
                    });
                    if(user) {
                        req.User = user;
                        next();
                    }
                } catch (e) {
                    return res.status(403).send({
                        success: false,
                        message: 'Access Denied.'
                    });
                }
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'Access Denied.'
        });
    }
};