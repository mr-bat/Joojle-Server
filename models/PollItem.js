const mongoose 			= require('mongoose');
const Schema 	 		= mongoose.Schema;

let PollItemSchema = new Schema({
    startDate: Date,
    endDate: Date,
    acceptCount: {
        type: Number,
        default: 0
    },
    declineCount: {
        type: Number,
        default: 0
    },
    poll: {
        type: Schema.Types.ObjectId,
        ref: 'Poll'
    }
}, {
    timestamps: true
});

const PollItemModel = mongoose.model('PollItem', PollItemSchema);
module.exports = PollItemModel;
