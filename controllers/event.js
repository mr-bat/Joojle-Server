const Event = require('../models/Event');
const User = require('../models/User');

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
        let events = await Event.find({owner: req.User});
        res.send({
            success: true,
            events
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