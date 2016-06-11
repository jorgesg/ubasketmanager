//HTTP Service
angular.module('app')
.service('PostsSvc', function ($http) {
    this.fetch = function () {
        return $http.get('/api/posts')
    }
    this.create = function (post) {
        return $http.post('/api/posts', post)
    }
    this.getSinglePost = function() {
        return $http.get('/api/posts/volcano')
    }
})