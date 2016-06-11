var db = require('../db')
var Cards = require('./card')
var user = db.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: { type: String, required: true },
    coins: { type: Number },
    wins: { type: Number },
    loses: { type: Number },
    roster: { type: Array }
})

module.exports = db.model('User', user)