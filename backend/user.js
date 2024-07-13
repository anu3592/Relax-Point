const mongoose = require('mongoose');
const { setThePassword } = require('whatwg-url');

const userSchema = mongoose.Schema({
    name:String,
    email: String,
    password: String,
})

module.exports = mongoose.model('users', userSchema);