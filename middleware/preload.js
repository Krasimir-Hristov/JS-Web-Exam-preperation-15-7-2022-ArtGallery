const publicationService = require('../services/publications')


function preload(populate) {
   return async function (req, res, next) {
       const id = req.params.id;

    if(populate) {
        res.locals.publication = await publicationService.getPublicationsAndUsers(id);
    } else {
        res.locals.publication = await publicationService.getPublicationById(id);
    }

    next();
};
}



module.exports = preload;
