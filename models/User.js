const mongoose 			= require('mongoose');
const Schema 	 		= mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: String
}, {
    timestamps: true
});

const UserModel	= mongoose.model('User', UserSchema);
module.exports = UserModel;
