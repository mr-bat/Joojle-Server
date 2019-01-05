const Event = require('../models/Event');

const check = async (startDate, endDate, user) => {
    let overlappingEvent = await Event.findOne({
        $and: [{
            state: 'Closed',
            participants: user,
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
        overlappingEvent
    } : {
        success: false
    };
};

module.exports = {
    check
};