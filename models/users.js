
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    ip: { type: String, unique: true },
    answers: String,
    visits: Number,
    visited: { type: Date, default: Date.now }
});

const Users = mongoose.model('Users',usersSchema);
module.exports = Users;