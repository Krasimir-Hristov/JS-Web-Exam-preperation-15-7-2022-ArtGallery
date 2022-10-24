const { Schema, model, Types: { ObjectId } } = require('mongoose');

//TODO add validations
const userSchema = new Schema({
    email: { type: String, require: true },
    hashedPassword: { type: String, require: true },
    gender: { type: String, require: true },
    trip: { type: [ObjectId], ref: 'Trip', default: [] },
});



userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;