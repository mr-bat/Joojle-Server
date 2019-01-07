const PollItem  = require('../models/PollItem');
const Comment   = require('../models/Comment');

const create = async (req, res, next) => {
    const { startDate, endDate, poll } = req.body;

    let pollItem = new PollItem({
        startDate,
        endDate,
        poll
    });
    try {
        await pollItem.save();
        res.send({
            success: true,
            message: 'Poll item has been successfully created.'
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};

const comment = async (req, res, next) => {
    const { pollItemId, text } = req.body;
    let comment = new Comment({
        user: req.User,
        text
    });
    try {
        await comment.save();
        await PollItem.updateOne({
            _id: pollItemId
        }, {
            $addToSet: {
                comments: comment
            }
        });
        res.send({
            success: true,
            message: 'Comment has been successfully added to poll item.'
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};


const fetch = async (req, res, next) => {
    const {pollItemId} = req.body;

    try {
        let comments = await PollItem.findById(pollItemId).populate('comments');

        res.send({
            success: true,
            comments
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
    comment,
    fetch
};
