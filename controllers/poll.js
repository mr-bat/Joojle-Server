const Mail  = require('./mail');
const Poll  = require('../models/Poll');
const Event = require('../models/Event');
const User  = require('../models/User');

const create = async (req, res, next) => {
    const {description, status, event} = req.body;
    let poll = new Poll({description, status, event});
    try {
        await poll.save();
        // TODO: Send Mail

        let event = await Event.findById(event);
        let participants = User.find({
            _id: {$in: event.participants}
        }, {_id: 0, email: 1});

        await Mail.sendMail(poll, participants);

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