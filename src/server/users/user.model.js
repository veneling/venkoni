const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, required: true, index: true, unique: true, sparse: true },
    hashedPassword: { type: String, required: true },
    roles: [ String ],
    firstName: { type: String, required: false, default: '' },
    lastName: { type: String, required: false, default: '' },
    dateCreated: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);