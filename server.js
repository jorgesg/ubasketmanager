var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.use(require('./auth'))
app.use('/api/cards', require('./controllers/api/cards'))
app.use('/api/friends', require('./controllers/api/friends'))
app.use('/api/messages', require('./controllers/api/messages'))
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/teams', require('./controllers/api/teams'))
app.use('/api/users', require('./controllers/api/users'))
app.use(require('./controllers/static'))

app.listen(3000, function () {
    console.log('Server listening on', 3000)
})