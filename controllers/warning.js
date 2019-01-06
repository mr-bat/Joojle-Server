const Event = require('../models/Event');

const check = async (startDate, endDate, user) => {
    let overlappingEvent = await Event.findOne({
        $and: [{
            state: 'Closed',
            participants: {$elemMatch: user._id},
        }, {
            $or: [{
                startDate: {$lte: startDate},
                endDate: {$gte: endDate}
            }, {
                startDate: {
                    $lt: startDate,
                    $gt: endDate
                },
            }, {
                endDate: {
                    $lt: endDate,
                    $gt: startDate
                }
            }]
        }]
    });
    return overlappingEvent ? {
        success: true,
        status: 'warning',
        message: `You have an overlapping vote in ${overlappingEvent.title}`
    } : {
        success: true,
        status: 'success'
    };
};

module.exports = {
    check
};