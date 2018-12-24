const Poll = require('../models/Poll');

const create = async (req, res, next) => {
    const {description, status, event} = req.body;
    let poll = new Poll({description, status, event});
    try {
        await poll.save();
        // TODO: Send Mail
        res.send({
            success: true,
            message: 'Poll has been successfully created.'
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};

module.exports = {
    create
};