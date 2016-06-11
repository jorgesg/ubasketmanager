var db = require('../db')

var Card = db.model('Card', {
    name : { type: String, required:true },
    type : { type: String, required:true },
    of : { type: Number, required:true },
    def : { type: Number, required:true },
    speed : { type: Number, required:true },
    ovr : { type: Number, required:true },
    pos : { type: String, required:true }
})

module.exports = Card