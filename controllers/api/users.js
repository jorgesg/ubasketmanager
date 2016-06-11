var router = require('express').Router()
var User = require('../../models/user')
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var config = require('../../config')

router.get('/', function(req, res, next){
    if(!req.headers['x-auth']) {
        return res.sendStatus(401)
    }
    
    var auth = jwt.decode(req.headers['x-auth'], config.secret)
    User.findOne({username: auth.username}, function(err, user){
        if(err) { return next(err) }
        res.json(user)
    })
})

router.get('/:username', function(req, res, next){
    User.find({username: req.params.username})
    .exec( function(err, user) {
        if(err) { return next(err) }
        
        res.json(user)
    })
})

router.post('/', function(req, res, next){
    console.log(req.body.username)
    var user = new User({username: req.body.username})
    bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err) { return next(err) }
        user.password = hash
        user.email = req.body.email
        user.coins = 100
        user.wins = 0
        user.loses = 0
        user.save(function (err){
            if(err) {return next(err) }
            res.sendStatus(201)
        })
    })
})

router.get('/roster/:username', function(req, res, next){
    User.findOne({username: req.params.username}, function(err, user){
        if(err) { return next(err) }
        var roster = user.roster
        res.json(roster)
    })
})

router.put('/roster/:username', function(req, res, next){
    User.findOne({username: req.params.username}, function(err, user){
        if(err) { return next(err) }
        /*for(var i=0; i<req.body.length; i++){
            user.roster.push(req.body[i])    
        }*/
        user.roster = req.body
        
        user.save(function(err) {
            if(err) { return next(err) }
            
            res.json({ message: 'User roster updated!' })
        })
    })
})

router.put('/roster/add/:username', function(req, res, next){
    User.findOne({username: req.params.username}, function(err, user){
        if(err) { return next(err) }
        for(var i=0; i<req.body.length; i++){
            user.roster.push(req.body[i])
        }
        
        user.save(function(err) {
            if(err) { return next(err) }
            
            res.json({ message: 'User roster updated!' })
        })
    })
})

module.exports = router