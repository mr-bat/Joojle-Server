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

exports.sendMail = (poll, recipients) => {
    let transform = {'<>':'li','html':'${field_name} : ${value}'};
    // let data = [
    //     {'field_name':'agency name','value':order.agency.name},
    //     {'field_name':'hotel name','value':order.hotel.name},
    //     {'field_name':'Date','value':order.updatedAt},
    //     {'field_name':'customer name','value':order.customer.firstName+' '+order.customer.lastName},
    //     {'field_name':'reference ID','value':order.refId},
    //     {'field_name':'price','value':order.price},
    //     {'field_name': 'cancellation_penalty', 'value': (order.penalty) ? order.penalty : 0}
    // ];
    // let html = json2html.transform(data,transform);
    let mailOptions = {
        from: '"Joojle" <reservation@cloudpms.ir>', // sender address (who sends)
        to: recipients, // list of receivers (who receives)
        subject: 'New Poll!', // Subject line
        // html: '<h3>New Poll :</h3>'+html
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
    });
};