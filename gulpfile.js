var gulp = require('gulp')
var fs = require('fs')

gulp.task('dev', ['watch:css', 'watch:js', 'dev:server'])

fs.readdirSync(__dirname + '/gulp').forEach(function(task) {
    require('./gulp/' + task)
})

gulp.task('build', ['js', 'css'])