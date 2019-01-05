const mongoose 			= require('mongoose');
const Schema 	 		= mongoose.Schema;

let EventSchema = new Schema({
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    state: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const EventModel = mongoose.model('Event', EventSchema);
module.exports = EventModel;
