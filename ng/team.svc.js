angular.module('app')
.service('TeamSvc', function($http){
    var svc = this
    
    svc.getTeams = function() {
        return $http.get('/api/teams')
    }
    
    svc.getTeam = function(user) {
        return $http.get('/api/teams/'+user)
    }
    
    svc.createTeam = function(starters) {
        return $http.post('/api/teams', starters)
    }
    
    svc.updateTeam = function(user, updated) {
        return $http.put('/api/teams/'+user, updated)
    }
})