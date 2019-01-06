const nodemailer    = require('nodemailer');
const json2html     = require('node-json2html');

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'reservation@cloudpms.ir',
        pass: 'so0sisReservation'
    }
});

function sendMailHandler(recipients, subject, htmlBody) {

    let mailOptions = {
        from: '"Joojle" <reservation@cloudpms.ir>', // sender address (who sends)
        to: recipients, // list of receivers (who receives)
        subject: subject,
        html: htmlBody
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
    });
}


exports.sendVoteRequest = (poll, recipients) => {
    let html = '<p> please vote for your suitable time slot in this event.</p>';

    sendMailHandler(
        recipients,
        poll.event.title + ' ' + 'event',
        html
    );
};


exports.sendFinalizedMail = (finalized_event) => {
    let html = '<h3> Your time for voting on this event is up!</h3>' +
        `<p>Event begins at ${finalized_event.startDate} until ${finalized_event.endDate}. </p>`;


    sendMailHandler(
        finalized_event.participants.map(p => p.email),
        finalized_event.title + ' ' + 'event',
        html
    );
};