var db = require('../db')

var Message = db.model('Message', {
    state: { type: String, required:true },
    emisor: { type: String, required:true },
    receptor: { type: String, required:true },
    textBody: { type: String, required:true },
    date: { type: Date, required: true, default: Date.now }
})

module.exports = Message