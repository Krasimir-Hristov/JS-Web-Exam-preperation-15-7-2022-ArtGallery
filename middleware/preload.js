const tripService = require('../services/tripService');


function preload() {
   return async function (req, res, next) {
       const id = req.params.id;
       const trip = await tripService.getTripById(id);
       req.locals.trip = trip;

       next();
   };
}

module.exports = preload;
