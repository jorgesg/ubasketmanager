angular.module('app')
.controller('ApplicationCtrl', function($scope, $location, UserSvc){
    
    if(window.localStorage.getItem('token')!=null){
        UserSvc.getSession(window.localStorage.getItem('token'))
        .then( function (response) {
            $scope.$emit('login', response.data)
        })
    }
    
    $scope.$on('login', function(_, user) {
        $scope.currentUser = user
        $location.path('/posts')
    })
    
    $scope.logout = function(){
        UserSvc.logout()
        $scope.currentUser = null
        $location.path('/login')
    }
})