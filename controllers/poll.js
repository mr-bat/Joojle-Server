const Mail  = require('./mail');
const Poll  = require('../models/Poll');
const Event = require('../models/Event');
const User  = require('../models/User');

const create = async (req, res, next) => {
    const {description, event} = req.body;
    let poll = new Poll({description, status: 'Open', event});
    try {
        await poll.save();
        // TODO: Send Mail
        let e = await Event.findById(event);
        let participants = await User.find({
            _id: {$in: e.participants}
        }, {_id: 0, email: 1});
        await Mail.sendMail(poll, participants);
        res.send({
            success: true,
            message: 'Poll has been successfully created.'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};

module.exports = {
    create
};