var express = require('express')
var router = express.Router()

router.use(express.static(__dirname + '/../assets'))
router.use(express.static(__dirname + '/../templates'))

router.get('/', function (req, res) {
    res.render('app.html.ejs')
})

module.exports = router