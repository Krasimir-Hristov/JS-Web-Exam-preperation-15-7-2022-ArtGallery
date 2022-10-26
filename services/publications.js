const Publication = require('../models/Publication');


async function createPublication(publication) {
    const result = new Publication(publication);
    await result.save();
}

async function getAllPublications() {
    return Publication.find({}).lean()
}

async function getPublicationsAndUsers(id) {
    return Publication.findById(id).populate('author').populate('usersShared').lean();
}

async function getPublicationById(id) {
    return Publication.findById(id).lean();
}



module.exports = {
    createPublication,
    getAllPublications,
    getPublicationById,
    getPublicationsAndUsers
}