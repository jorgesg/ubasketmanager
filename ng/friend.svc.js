angular.module('app')
.service('FriendSvc', function($http){
    var svc = this
    
    svc.getFriendsList = function(user) {
        return $http.get('/api/friends/'+user)
    }
})