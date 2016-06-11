angular.module('app')
.controller('ShopCtrl', function($scope, CardsSvc, UserSvc){
    var pack = []
    
    getCards = function () {
        CardsSvc.getCards()
        .then(function (response) {
            for(var i=0; i<=3; i++){
                var num = Math.floor(Math.random() * (14 - 0 + 1)) + 0
                var type
                if(num==0){
                    type = "gold"
                }
                else if(num%2==0){
                    type = "silver"
                }
                else {
                    type = "bronze"
                }
                var aux = []
                for(var j=0; j<response.data.length; j++){
                    if(response.data[j].type == type){
                        aux.push(response.data[j])
                    }
                }
                
                var min = 0
                var max = aux.length-1
                var p = Math.floor(Math.random() * (max - min + 1)) + min
                document.getElementById("demo"+i).innerHTML = aux[p].name
                document.getElementById("demo"+i).setAttribute("class", type)
                pack.push(aux[p])
            }
            console.log(JSON.stringify(pack))
        })
    }
    
    saveCards = function () {
        UserSvc.addToRoster($scope.currentUser.username, pack)
        .then( function(response) {
            console.log(response)
        })
    }
})