const mongoose 			= require('mongoose');
const Schema 	 		= mongoose.Schema;

let CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String
}, {
    timestamps: true
});

const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;
