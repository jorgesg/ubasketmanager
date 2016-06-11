angular.module('app')
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {controller: 'LoginCtrl', templateUrl: 'login.html'})
    .when('/posts', {controller: 'PostCtrl', templateUrl: 'posts.html'})
    .when('/register', {controller: 'RegisterCtrl', templateUrl: 'register.html'})
    .when('/login', {controller: 'LoginCtrl', templateUrl: 'login.html'})
    .when('/roster', {controller: 'RosterCtrl', templateUrl: 'roster.html'})
    .when('/shop', {controller: 'ShopCtrl', templateUrl: 'shop.html'})
    .when('/messages', {controller: 'MessagesCtrl', templateUrl: 'messages.html'})
})