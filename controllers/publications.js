const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createPublication, updatePublication, deletePublication, sharePublication,  } = require('../services/publications');
const mapErrors = require('../util/mappers');

const router = require('express').Router();


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Publication', data: {} });
});


router.post('/create', isUser(), async (req, res) => {
        const publication = {
            title: req.body.title,
            technique: req.body.technique,
            picture: req.body.picture,
            certificate: req.body.certificate,
            author: req.session.user._id
        };
           


        try {
            await createPublication(publication);

            res.redirect('/catalog');
        } catch (err) {
            console.error(err);
            const errors = mapErrors(err);
            res.render('create', { title: 'Create Publication', data: publication, errors });
        }
    });

    router.get('/edit/:id', preload(), isOwner(), (req, res) => {
        res.render('edit', { title: 'Edit Offer' }); 
    }); 
    router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
        const id = req.params.id;

        const publication = {
            title: req.body.title,
            technique: req.body.technique,
            picture: req.body.picture,
            certificate: req.body.certificate,
        };

        try {
            await updatePublication(id, publication);
        res.redirect('/catalog/' + id);
            
        } catch (err) {
            console.error(err);
            const errors = mapErrors(err);
            publication._id = id;
            res.render('edit', { title: 'Update Publication',  publication, errors });
        }

    });
            

    router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
        await deletePublication(req.params.id);
        res.redirect('/catalog')
    });     

    router.get('/share/:id', isUser(),  async (req, res) => {


        const id = req.params.id;

        try {
            await sharePublication(id, req.session.user._id);

        } catch (err) {
            console.error(err);
        } finally {
            res.redirect('/catalog/' + id);

        }



        
    }); 


module.exports = router;    