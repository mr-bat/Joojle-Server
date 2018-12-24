const mongoose 			= require('mongoose');
const Schema 	 		= mongoose.Schema;

let PollItemSchema = new Schema({
    startDate: Date,
    endDate: Date,
    acceptCount: Number,
    declineCount: Number,
    poll: {
        type: Schema.Types.ObjectId,
        ref: 'Poll'
    }
}, {
    timestamps: true
});

const PollItemModel = mongoose.model('PollItem', PollItemSchema);
module.exports = PollItemModel;
