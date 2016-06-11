var router = require('express').Router()
var Team = require('../../models/team')
var jwt = require('jwt-simple')
var config = require('../../config')

router.get('/', function(req, res, next) {
    
    Team.find()
    .exec(function(err, team) {
        if(err) { return next(err) }
        res.json(team)
    })
    
})

router.get('/:user', function(req, res, next) {
    
    Team.findOne({ user: req.params.user })
    .exec(function(err, team) {
        if(err) { return next(err) }
        res.json(team)
    })
    
})

router.post('/', function(req, res, next) {
    var auth = jwt.decode(req.headers['x-auth'], config.secret)
    var team = new Team({user: auth.username})
    
    for(var i=0; i<req.body.length; i++){
        if(req.body[i].pos == "Guard" && team.guard1 == null){
            team.guard1 = req.body[i]
        }
        else if(req.body[i].pos == "Guard" && team.guard2 == null){
            team.guard2 = req.body[i]
        }
        else if(req.body[i].pos == "Forward" && team.forward1 == null){
            team.forward1 = req.body[i]
        }
        else if(req.body[i].pos == "Forward" && team.forward2 == null){
            team.forward2 = req.body[i]
        }
        else if(req.body[i].pos == "Center" && team.center == null){
            team.center = req.body[i]
        }
        else if(req.body[i].pos == "6Man" && team.sixthman == null){
            team.sixthman = req.body[i]
        }
        else if(req.body[i].pos == "Coach" && team.coach == null){
            team.coach = req.body[i]
        }
    }
    
    team.rating = Math.floor((team.guard1.ovr+team.guard2.ovr+team.forward1.ovr+team.forward2.ovr+team.center.ovr+team.sixthman.ovr+team.coach.ovr)/7)
    
    
    team.save( function(err) {
        if(err) { return next(err) }
        
        res.sendStatus(201)
    })
})

router.put('/:user', function(req, res, next) {
    Team.findOne({ user: req.params.user })
    .exec(function(err, team) {
        if(err) { return next(err) }
        team.guard1 = req.body.guard1
        team.guard2 = req.body.guard2
        team.forward1 = req.body.forward1
        team.forward2 = req.body.forward2
        team.center = req.body.center
        team.sixthman = req.body.sixthman
        team.coach = req.body.coach
        
        team.rating = Math.floor((team.guard1.ovr+team.guard2.ovr+team.forward1.ovr+team.forward2.ovr+team.center.ovr+team.sixthman.ovr+team.coach.ovr)/7)
        
        team.save( function(err) {
            if(err) { return next(err) }
            
            res.sendStatus(201)
        })
    })
})

module.exports = router