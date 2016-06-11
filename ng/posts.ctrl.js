//Controller
angular.module('app')
.controller('PostCtrl', function($scope, PostsSvc, TeamSvc, UserSvc) {
    TeamSvc.getTeam($scope.currentUser.username)
    .then( function(response) {
      $scope.currentTeam = response.data
      UserSvc.getRoster($scope.currentUser.username)
      .then( function(response) {
          $scope.roster = response.data
      })
    })
    
    // the function runs when the "Add Post" button is clicked
    $scope.addPost = function() {
        // only add a post if there is a body
        if($scope.postBody){
            PostsSvc.create({
                username: $scope.currentUser.username,
                body: $scope.postBody
            }).success(function (post) {
                $scope.posts.unshift(post)
                $scope.postBody = null
            })
        }
    }

    PostsSvc.fetch().success(function (posts){
        $scope.posts = posts
    })
    
    getSinglePost = function () {
        PostsSvc.getSinglePost()
        .then(function(response){
            console.log(response.data)
        })
    }
})