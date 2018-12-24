const mongoose 			= require('mongoose');
const Schema 	 		= mongoose.Schema;

let PollSchema = new Schema({
    description: String,
    status: String,
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }
}, {
    timestamps: true
});

const PollModel = mongoose.model('Poll', PollSchema);
module.exports = PollModel;
