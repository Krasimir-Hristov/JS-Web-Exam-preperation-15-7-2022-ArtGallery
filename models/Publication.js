const { Schema, model, Types: { ObjectId } } = require('mongoose');


//const URL_PATTERN = /^https?:\/\/(.+)/;


const publicationSchema = new Schema({
    title: { type:String, required: true },
    technique: { type:String, required: true },
    picture: { type:String, required: true },
    certificate: { type:String, required: true, enum: ['Yes', 'No'] },
    author: { type: ObjectId, ref: 'User', required: true },
    usersShared: { type: [ObjectId], ref: 'User', default: [] },
});

const Publication = model('Publication', publicationSchema);

module.exports = Publication; 
