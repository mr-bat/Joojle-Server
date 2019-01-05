const Poll  = require('../models/Poll');
const Event = require('../models/Event');
const User  = require('../models/User');
const PollItem = require('../models/PollItem');
const Mail = require('../controllers/mail');

const create = async (req, res, next) => {
    let participantEmails = req.body.participantEmails;
    let title = req.body.title;
    let description = req.body.description;
    let pollTimes = req.body.pollTimes;

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

        let poll = new Poll({description: title, status: 'Open', event});
        await poll.save();

        let pollItems = [];
        for (let timeItem of pollTimes){
            let pollItem = new PollItem({
                startDate: timeItem[0],
                endDate: timeItem[1],
                poll
            });
            pollItems.push(pollItem);
        }

        await PollItem.insertMany(pollItems);
        await Mail.sendMail(poll, participants.map(p => p.email));

        event.owner = req.User;
        res.send({
            success: true,
            message: 'Event has been added successfully.',
            event,
            poll,
            pollItems
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
        let events = await Event.find({owner: req.User}).populate('participants');
        for (let event of events) {
            let poll        = await Poll.findOne({event});
            let pollItems   = await PollItem.find({poll});
            result.push({
                event,
                poll,
                pollItems
                // status: poll.status,
                // acceptCount: pollItems.acceptCount,
                // declineCount: pollItems.declineCount,
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
