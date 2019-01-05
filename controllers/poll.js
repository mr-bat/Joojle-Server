const Mail              = require('./mail');
const Poll              = require('../models/Poll');
const Event             = require('../models/Event');
const User              = require('../models/User');
const Vote              = require('../models/Vote');
const PollItem          = require('../models/PollItem');
const voteController    = require('./vote');
const warningController = require('./warning');


const create = async (req, res, next) => {
    const {description, event} = req.body;
    let poll = new Poll({description, status: 'Open', event});
    try {
        await poll.save();
        let e = await Event.findById(event);
        let participants = await User.find({
            _id: {$in: e.participants}
        }, {_id: 0, email: 1});
        await Mail.sendMail(poll, participants);
        res.send({
            success: true,
            message: 'Poll has been successfully created.'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};

const vote = async (req, res, next) => {
    const verdict = req.body.verdict;
    const pollItem = req.body.pollItemId;
    const voter = req.body.voterId;

    //TODO: check if voter is an event participant
    let pi = await PollItem.findById(pollItem);
    try {

        let previousVote = await Vote.findOne({
           pollItem, voter
        }).populate('pollItem');

        if (previousVote === null) {
            let newVote = new Vote({
                pollItem,
                voter,
                verdict
            });

            if (verdict === voteController.possibleVotes.DECLINE) {
                await pollItem.update({
                    $inc: {
                        declineCount: 1
                    }
                });
            } else if (verdict === voteController.possibleVotes.ACCEPT) {
                let check = await warningController(pi.startDate, pi.endDate, req.User);
                if(check.success) {
                    return res.status(400).send({
                        success: false,
                        message: 'You have an overlapping event.',
                        ovelappingEvent: check.overlappingEvent
                    })
                }
                await pollItem.update({
                    $inc: {
                        acceptCount: 1
                    }
                });
            }
            await newVote.save();

        } else {
            if (previousVote.verdict === voteController.possibleVotes.ACCEPT){
                if (previousVote.pollItem.verdict === voteController.possibleVotes.DECLINE) {
                    await pollItem.update({
                        $inc: {
                            acceptCount: -1,
                            declineCount: 1
                        }
                    });
                }
            } else if(previousVote.verdict === voteController.possibleVotes.DECLINE) {
                if (previousVote.pollItem.verdict === voteController.possibleVotes.ACCEPT) {
                    let check = await warningController(pi.startDate, pi.endDate, req.User);
                    if(check.success) {
                        return res.status(400).send({
                            success: false,
                            message: 'You have an overlapping event.',
                            ovelappingEvent: check.overlappingEvent
                        })
                    }
                    await pollItem.update({
                        $inc: {
                            acceptCount: 1,
                            declineCount: -1
                        }
                    });
                }
            }
        }
        res.send({
            success: true,
            message: 'Your vote has been updated',
            vote
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: 'Internal server error.'
        });
    }
};

module.exports = {
    create,
    vote
};