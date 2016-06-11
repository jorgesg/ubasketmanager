var Post = require('../../models/post')
var router = require('express').Router()

router.get('/', function (req, res, next) {
    Post.find()
    .sort('-date')
    .exec(function(err, posts) {
        if(err) { return next(err) }
        res.json(posts)
    })
})

router.get('/:username', function(req, res, next) {
    Post.findOne({username: req.params.username})
    .exec(function(err, post) {
        if(err){ return next(err) }
        if(!post){ return res.sendStatus(401) }
        
        res.json(post)
    })
})

router.post('/', function(req, res, next) {
    var post = new Post({
        body: req.body.body
    })
    post.username = req.body.username
    post.save(function (err, post) {
        if(err) { return next(err) }
        res.status(201).json(post)
    })
})

module.exports = router