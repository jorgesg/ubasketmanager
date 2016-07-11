var db = require('../db')

var Match = db.model('Match', {
    user1 : {type: String, required:true},
    user2 : {type: String, required:true},
    result : {type: String, required:true},
    winner : {type: String, required:true}
})

module.exports = Match