
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    IP: String,
    answers: String,
    visits: Number,
    lastVisit: Date.now(),
});

const Users = mongoose.model('Users',usersSchema);
module.exports = Users;