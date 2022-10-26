const { Schema, model, Types: { ObjectId } } = require('mongoose');

//TODO add validations
const userSchema = new Schema({
    username: { type: String, require: true },
    hashedPassword: { type: String, require: true },
    address : { type: String, require: true },
    publications : { type: [ObjectId], ref: 'Publication', default: [] }
});


userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;