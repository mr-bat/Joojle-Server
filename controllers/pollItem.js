const PollItem = require('../models/PollItem');

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
        })
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