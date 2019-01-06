const User = require('../models/User');
const Event = require('../models/Event');
const Poll = require('../models/Poll');
const PollItem = require('../models/PollItem');
const mongoose      = require('mongoose');
const Mail = require('../controllers/mail');


const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/joojle'); // connect to our database based on environment
db.on('error', console.error.bind(console, 'connection error:'));


async function save_user(username, email) {
    let user = new User({
        username,
        email
    });

    try {
        await user.save();
        return user;
    } catch (e) {
        console.log(e);
    }
}


async function create_event(title, participantEmails, owner, description, pollTimes) {
    try {

        let participants = await User.find({
            'email': {$in: participantEmails}
        });

        event = new Event({
            owner,
            title,
            description,
            participants,
            state: 'Open'
        });

        await event.save();

        let poll = new Poll({description: title, status: 'Open', event});
        await poll.save();

        let pollItems = [];
        for (let timeItem of pollTimes){
            let pollItem = new PollItem({
                startDate: timeItem[0],
                endDate: timeItem[1],
                poll
            });
            pollItems.push(pollItem);
        }

        await PollItem.insertMany(pollItems);
        await Mail.sendVoteRequest(poll, participants.map(p => p.email));

        event.owner = owner;
        return event;

    } catch (e) {
        console.log(e);
    }
}

save_user('naweed', 'navidmdn74@gmail.com').then(async owner => {
   let p1 =  await save_user('p1', 'p1@mail.com');
   let p2 =  await save_user('p2', 'p2@mail.com');
   e = await create_event('TEST EVENT', [p1.email, p2.email], owner, 'FUCK OFF! :)))', [['2018-09-11','2018-09-13'],
       ['2018-10-11','2018-10-13']]);
}).catch(err => {
    console.log(err);
});