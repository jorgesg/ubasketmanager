var db = require('../db')

var Friend = db.model('Friend', {
    user1 : { type: String, required:true },
    user2 : { type: String, required:true },
    state : { type: String, required:true }
})

module.exports = Friend