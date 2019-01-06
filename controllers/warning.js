const Event = require('../models/Event');

const check = async (startDate, endDate, user) => {
    let overlappingEvent = await Event.findOne({
        $and: [{
          owner: user._id,
          state: 'Closed'
        },
          {
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
    console.log(overlappingEvent);
    return overlappingEvent ? {
        success: true,
        status: 'warning',
        message: `You have an overlapping vote in ${overlappingEvent.title}`
    } : {
        success: false,
        status: 'success'
    };
};

module.exports = {
    check
};
