const Event = require('../models/Event');
const User = require('../models/User');

const create = async (req, res, next) => {

    let ownerId = req.body.ownerId;
    let participantEmails = req.body.participants;
    let title = req.body.title;
    let description = req.body.description;

    try {

        let participants = await User.find({
            'email': {$in: participantEmails}
        });


        event = new Event({
            ownerId,
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


module.exports = {
    create
};