const Poll  = require('../models/Poll');
const Event = require('../models/Event');
const User  = require('../models/User');
const PollItem = require('../models/PollItem');

const create = async (req, res, next) => {
    let participantEmails = req.body.participantEmails;
    let title = req.body.title;
    let description = req.body.description;

    try {
        let participants = await User.find({
            'email': {$in: participantEmails}
        });
        event = new Event({
            owner: req.User,
            title,
            description,
            participants
        });

        await event.save();

        res.send({
            success: true,
            message: 'Event has been added successfully.',
            event
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};

const read = async (req, res, next) => {
    try {
        let result = [];
        let events = await Event.find({owner: req.User});
        for (let event of events) {
            let poll        = await Poll.findOne({event});
            let pollItems   = await PollItem.find({poll});
            result.push(Object.assign(event), {
                pollItems
            });
        }
        res.send({
            success: true,
            result
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};

module.exports = {
    create,
    read
};