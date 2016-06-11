angular.module('app')
.service('CardsSvc', function($http){
    var svc = this
    
    svc.getCards = function() {
        return $http.get('/api/cards')
    }
    
    
    svc.getCardsByType = function(type) {
        return $http.get('/api/cards/'+type)
    }
})