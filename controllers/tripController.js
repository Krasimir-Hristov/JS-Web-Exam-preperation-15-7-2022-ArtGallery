const router = require('express').Router();
const { isUser, isOwner  } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createTrip, updateTrip, deleteTrip, joinTrip } = require('../services/tripService');
const mapErrors = require('../util/mappers');



router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Trip', data: {} })
});

router.post('/create', isUser(), async (req, res) => {
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        owner: req.session.user._id
    };

    try {
        await createTrip(trip);

        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Create Trip',  data: trip, errors });
    }

});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
    };

    try {
        await updateTrip(id, trip);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        trip._id = id;
        res.render('edit', {title: 'Edit Trip',  trip, errors });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteTrip(req.params.id);
    res.redirect('/catalog');     
});

router.get('/join/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await joinTrip(id, req.session.user._id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect('/catalog');     
    }


        
        

});

module.exports = router;