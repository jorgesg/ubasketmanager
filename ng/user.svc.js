angular.module('app')
.service('UserSvc', function($http){
    var svc = this
    
    svc.getUser = function() {
        return $http.get('/api/users')
    }
    
    svc.getSession = function(token) {
        return $http.get('/api/sessions/'+token)
    }
    
    svc.login = function(username, password) {
        return $http.post('/api/sessions', {
            username: username, password: password
        }).then(function (val) {
            svc.token = val.data
            $http.defaults.headers.common['X-Auth'] = val.data
            window.localStorage.setItem('token', svc.token)
            return svc.getUser()
        })
    }
    
    svc.createUser = function(username, password, email) {
        return $http.post('/api/users', {
            username: username, password: password, email: email
        }).then(function (val) {
            console.log('Registrado '+ username)
        })    
    }
    
    svc.getRoster = function(username) {
        return $http.get('/api/users/roster/' + username)
    }
    
    svc.createRoster = function(username, starters) {
        return $http.put('/api/users/roster/' + username, starters)
    }
    
    svc.addToRoster = function(username, pack) {
        return $http.put('/api/users/roster/add/' + username, pack)
    }
    
    svc.createTeam = function(starters) {
        return $http.post('/api/teams', starters)
    }
    
    svc.logout = function() {
        window.localStorage.removeItem('token')
        //$http.defaults.headers.common['X-Auth'] = null
    }
    
})