const routes        = require('./routes/index');
const middlewares   = require('./middlewares');

exports = module.exports = (app) => {
    app.use('/user', routes.user);
    app.use('/poll_item', middlewares.auth, routes.pollItem);
    app.use('/poll', routes.poll);
    app.use('/event', routes.event);
};