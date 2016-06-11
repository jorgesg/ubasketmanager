angular.module('app')
.controller('RegisterCtrl', function($scope, UserSvc, CardsSvc){
    $scope.createUser = function (username, password, email) {
        UserSvc.createUser(username, password, email)
        .then( function (response) {
            UserSvc.login(username, password)
            .then( function (response) {
                $scope.$emit('login', response.data)
                CardsSvc.getCardsByType('gold')
                .then( function(response) {
                    
                    var n=0
                    var starters = []
                    while(starters.length<7){
                        //Guards
                        if(n==0 || n==1){
                            for(var j=0; j<response.data.length; j++){
                                if(response.data[j].pos == "Guard"){
                                    starters.push(response.data[j])
                                    n++
                                }
                            }
                        }
                        //Forwards
                        else if(n==2 || n==3){
                            for(var j=0; j<response.data.length; j++){
                                if(response.data[j].pos == "Forward"){
                                    starters.push(response.data[j])
                                    n++
                                }
                            }
                        }
                        //Center
                        else if(n==4){
                            for(var j=0; j<response.data.length; j++){
                                if(response.data[j].pos == "Center"){
                                    starters.push(response.data[j])
                                    n++
                                }
                            }
                        }
                        //6Man
                        else if(n==5){
                            for(var j=0; j<response.data.length; j++){
                                if(response.data[j].pos == "6Man"){
                                    starters.push(response.data[j])
                                    n++
                                }
                            }
                        }
                        //Coach
                        else if(n==6){
                            for(var j=0; j<response.data.length; j++){
                                if(response.data[j].pos == "Coach"){
                                    starters.push(response.data[j])
                                    n++
                                }
                            }
                        }
                    }
                    UserSvc.createRoster(username, starters)
                    .then( function(response) {
                        UserSvc.createTeam(starters)
                        .then( function(response) {
                            console.log(response)
                        })
                    })
                })
            })
        })
    }
})