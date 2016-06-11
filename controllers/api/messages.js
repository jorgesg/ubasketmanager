var router = require('express').Router()
var Message = require('../../models/message')
var User = require('../../models/user')

router.get('/', function(req, res, next){
    Message.find()
    .exec(function(err, msg) {
        if(err) { return next(err) }
        res.json(msg)
    })
})

router.get('/:user', function(req, res, next){
    Message.find({ $or: [ {emisor: req.params.user}, {receptor: req.params.user} ] })
    .sort('-date')
    .exec(function(err, msg) {
        if(err) { return next(err) }
        res.json(msg)
    })
})

router.post('/', function(req, res, next){
    var msg = new Message({emisor: req.body.emisor})
    msg.receptor = req.body.receptor
    msg.textBody = req.body.textBody
    msg.state = "readed"
    
    msg.save(function(err, msg) {
        if(err) { return next(err) }
        res.status(201).json(msg)
    })
})

module.exports = router