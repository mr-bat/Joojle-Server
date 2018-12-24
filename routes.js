const routes = require('./routes/index');

exports = module.exports = (app) => {
    app.use('/user', routes.user);
    app.use('/event', routes.event)
};