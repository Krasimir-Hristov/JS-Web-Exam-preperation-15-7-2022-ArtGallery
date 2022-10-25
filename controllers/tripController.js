const router = require('express').Router();
const { isUser  } = require('../middleware/guards');
const { createTrip } = require('../services/tripService');
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
        seats: req.body.seats,
        price: req.body.price,
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

module.exports = router;