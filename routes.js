const routes = require('./routes/index');

exports = module.exports = (app) => {
    app.use('/user', routes.user);
    app.use('/poll_item', routes.pollItem);
    app.use('/poll', routes.poll);
    app.use('/event', routes.event);
};