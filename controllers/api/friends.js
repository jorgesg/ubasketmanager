var router = require('express').Router()
var Friend = require('../../models/friend')
var User = require('../../models/user')

router.get('/', function(req, res, next){
    Friend.find()
    .exec(function(err, friend) {
        if(err) { return next(err) }
        res.json(friend)
    })
})

router.get('/:user', function(req, res, next){
    Friend.find({$and: [{state: "accepted"}, { $or: [ { user1: req.params.user }, { user2: req.params.user } ] } ]})
    .exec(function(err, friend) {
        if(err) { return next(err) }
        res.json(friend)
    })
})

router.get('/:user/:state', function(req, res, next){
    Friend.find({user1: req.params.user, state: req.params.state})
    .exec(function(err, friend) {
        if(err) { return next(err) }
        res.json(friend)
    })
})

router.post('/', function(req, res, next){
    var friend = new Friend({user1: req.body.user1})
    friend.user2 = req.body.user2
    friend.state = "pending"
    
    friend.save(function(err, friend) {
        if(err) { return next(err) }
        res.status(201).json(friend)
    })
})

router.put('/:user/:state', function(req, res,next){
    Friend.findOne({user2: req.params.user, state: req.params.state})
    .exec(function(err, friend) {
        if(err) { return next(err) }
        
        friend.state = "accepted"
        friend.save( function(err) {
            if(err) { return next(err) }
            
            res.sendStatus(201)
        })
    })
})

module.exports = router