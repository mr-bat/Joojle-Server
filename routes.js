const routes = require('./routes/index');

exports = module.exports = (app) => {
    app.use('/user', routes.user);
};