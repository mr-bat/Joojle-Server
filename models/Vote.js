const mongoose 			= require('mongoose');
const Schema 	 		= mongoose.Schema;

let VoteSchema = new Schema({
    verdict: String,
    pollItem: {
        type: Schema.Types.ObjectId,
        ref: 'PollItem'
    },
    voter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const VoteModel = mongoose.model('Vote', VoteSchema);
module.exports = VoteModel;
