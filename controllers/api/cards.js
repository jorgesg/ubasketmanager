var Card = require('../../models/card')
var router = require('express').Router()

router.get('/', function(req, res, next) {
    
    Card.find()
    .exec(function(err, cards) {
        if(err) { return next(err) }
        res.json(cards)
    })
    
})

router.get('/:type', function(req, res, next) {
    
    Card.find({type: req.params.type})
    .exec(function(err, cards) {
        if(err) { return next(err) }
        res.json(cards)
    })
    
})

module.exports = router