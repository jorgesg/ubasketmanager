var db = require('../db')

var Team = db.model('Team', {
    user: { type: String, required: true },
    guard1: { type: Object, required: true },
    guard2: { type: Object, required: true },
    forward1: { type: Object, required: true },
    forward2: { type: Object, required: true },
    center: { type: Object, required: true },
    sixthman: { type: Object, required: true },
    coach: { type: Object, required: true },
    rating: { type: Number, required: true }
})

module.exports = Team