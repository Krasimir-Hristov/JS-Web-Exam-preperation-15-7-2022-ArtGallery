const { getAllTrips } = require('../services/tripService');

const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/catalog', async (req, res) => {
    const trips = await getAllTrips();
    res.render('catalog', { title: 'Shared Trips', trips });
});


module.exports = router;
