const { Schema, model, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, require: true, minlength: [4, 'The username should be at least 4 characters long']},
    hashedPassword: { type: String, require: true, minlength: [3, 'The Password should be at least 3 characters long'] },
    address : { type: String, require: true, maxlength: [20, 'The Address should be maximum 20 characters long'] },
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