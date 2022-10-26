const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const publicationsController = require('../controllers/publications')

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(publicationsController);


    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found' });
    });
}
        