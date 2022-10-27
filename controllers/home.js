const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllPublications, getPublicationsByUser, getSharesByUser } = require('../services/publications');

const router = require('express').Router();


router.get('/', async (req, res) => {
    const publications = await getAllPublications();
     publications.map(p => p.shares = p.usersShared.length);
    res.render('home', { title: 'Publications', publications });
});

router.get('/catalog', async (req, res) => {
    const publications = await getAllPublications();
    res.render('gallery', { title: 'Publications', publications });
});

router.get('/catalog/:id', preload(true), (req, res) => {
    const publication = res.locals.publication;

    if(req.session.user) {
        publication.hasUser = true;
        publication.isOwner = req.session.user._id == publication.author._id;

        if(publication.usersShared.some(s => s._id == req.session.user._id)) {
            publication.isShared = true;
        }
    }
    res.render('details', { title: 'Publication Details' });
});

router.get('/profile', preload(true),  isUser(), async (req, res) => {
     const publicationsByUser = await getPublicationsByUser(res.locals.user._id);
     const sharesByUser = await getSharesByUser(res.locals.user._id);
     res.locals.user.publications = publicationsByUser;
     res.locals.user.shares = sharesByUser;
     res.render('profile', { title: 'Profile Page'});
})


module.exports = router;