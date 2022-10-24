//TODO replace with actual service;
const collectionService = {};


function preload() {
   return async function (req, res, next) {
       const id = req.params.id;
       //TODO change property name to match  collection
       const data = await collectionService.getById(id);
       req.locals.data = data;

       next();
   };
}

module.exports = preload;
