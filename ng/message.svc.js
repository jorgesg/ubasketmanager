angular.module('app')
.service('MessageSvc', function($http){
    var svc = this
    
    svc.getConversations = function(user) {
        return $http.get('/api/messages/'+user)
    }
    
    svc.send = function(msg) {
        return $http.post('/api/messages', msg)
    }
})