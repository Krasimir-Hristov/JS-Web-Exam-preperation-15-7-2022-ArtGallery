const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllPublications } = require('../services/publications');

const router = require('express').Router();


router.get('/', async (req, res) => {
    const publications = await getAllPublications();
    res.render('home', { title: 'Publications', publications });
});

router.get('/catalog', async (req, res) => {
    const publications = await getAllPublications();
    res.render('gallery', { title: 'Publications', publications });
});

router.get('/catalog/:id', preload(true), (req, res) => {
    const publication = res.locals.publication;

    publication.shared = publication.usersShared.length;
    if(req.session.user) {
        publication.hasUser = true;
        publication.isOwner = req.session.user._id == publication.author._id;

        if(publication.usersShared.some(s => s._id == req.session.user._id)) {
            publication.isShared = true;
        }
    }
    res.render('details', { title: 'Publication Details' });
});

// router.get('/profile', isUser(), async (req, res) => {
//     const tripsByUser = await getTripsByUser(res.locals.user._id);
//     res.locals.user.tripCount = tripsByUser.length;
//     res.locals.user.trips = tripsByUser;
//     res.render('profile', { title: 'Profile Page'});
// })


module.exports = router;