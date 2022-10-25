const authController = require('../controllers/auth');
const tripController = require('../controllers/tripController');
const homeController = require('../controllers/homeController');

module.exports = (app) => {
    app.use(authController);
    app.use(tripController);
    app.use(homeController);

    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found' });
    })
}