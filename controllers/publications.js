const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createPublication,  } = require('../services/publications');
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

    // router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    //     res.render('edit', { title: 'Edit Offer' }); 
    // });

    // router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    //     const id = req.params.id;
    //     const trip = {
    //         start: req.body.start,
    //         end: req.body.end,
    //         date: req.body.date,
    //         time: req.body.time,
    //         carImg: req.body.carImg,
    //         carBrand: req.body.carBrand,
    //         seats: Number(req.body.seats),
    //         price: Number(req.body.price),
    //         description: req.body.description,
    //     };

    //     try {
    //         await updateTrip(id, trip);
    //     res.redirect('/trips/' + id);
            
    //     } catch (err) {
    //         console.error(err);
    //         const errors = mapErrors(err);
    //         trip._id = id;
    //         res.render('edit', { title: 'Create Trip Offer',  trip, errors });
    //     }

    // });
            

    // router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    //     await deleteById(req.params.id);
    //     res.redirect('/trips')
    // });     

    // router.get('/join/:id', isUser(),  async (req, res) => {


    //     const id = req.params.id;

    //     try {
    //         await joinTrip(id, req.session.user._id);

    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         res.redirect('/trips/' + id);

    //     }



        
    // }); 


module.exports = router;    