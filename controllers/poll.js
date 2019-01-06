const Mail              = require('./mail');
const Poll              = require('../models/Poll');
const PollItem          = require('../models/PollItem');
const Event             = require('../models/Event');
const User              = require('../models/User');
const Vote              = require('../models/Vote');
const voteController    = require('./vote');
const warningController = require('./warning');


const create = async (req, res, next) => {
    const {description, event} = req.body;
    let poll = new Poll({description, status: 'Open', event});
    try {
        await poll.save();
        // TODO: Send Mail
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

const processVote = async (verdict, pollItem, voter, isNew) => {
  let newVote = new Vote({
    pollItem,
    voter,
    verdict
  });
  const vote = isNew ? 1: -1;
  if (isNew) {
    await newVote.save();
  }
  if (verdict === voteController.possibleVotes.DECLINE) {
    await PollItem.update({_id: pollItem}, {
      $inc: {
        declineCount: vote,
      }
    });
  } else if (verdict === voteController.possibleVotes.ACCEPT) {
    await PollItem.update({_id: pollItem}, {
      $inc: {
        acceptCount: vote,
      }
    });
  }
};

const vote = async (req, res, next) => {
    const verdict = req.body.verdict;
    const pollItem = req.body.pollItemId;
    const voter = req.User;

    //TODO: check if voter is an event participant

    try {


        let previousVote = await Vote.findOne({pollItem, voter}).populate('pollItem');
        if (!previousVote || previousVote.verdict !== verdict) {
            if (previousVote) {
                await processVote(previousVote.verdict, pollItem, voter, false);
                await previousVote.remove();
            }
            await processVote(verdict, pollItem, voter, true);
            if (verdict === voteController.possibleVotes.ACCEPT) {
                let pi      = await PollItem.findById(pollItem);
                let check   = await warningController.check(pi.startDate, pi.endDate, req.User);
                if(check.success) {
                    return res.status(200).send({
                        success: true,
                        message: 'You have an overlapping event.',
                        overlappingEvent: check.overlappingEvent,
                        status: 'warning'
                    });
                }
            }
        }
        res.send({
            success: true,
            message: 'Your vote has been updated',
            status: 'success'
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
