angular.module('app')
.controller('MessagesCtrl', function($scope, FriendSvc, MessageSvc){
    FriendSvc.getFriendsList($scope.currentUser.username)
    .then( function(response) {
        var aux=[]
        for(var i=0; i<response.data.length; i++) {
            if($scope.currentUser.username.localeCompare(response.data[i].user1)!=0){
                aux.push(response.data[i].user1)
            }
            else if($scope.currentUser.username.localeCompare(response.data[i].user2)!=0){
                aux.push(response.data[i].user2)
            }
        }
        $scope.listFriends = aux
    })
    
    var allConv = []
    MessageSvc.getConversations($scope.currentUser.username)
    .then( function(response) {
        if(response.data.length>0){
            allConv = response.data
            if($scope.currentUser.username.localeCompare(allConv[0].emisor)!=0){
                console.log("emisor: "+allConv[0].emisor)
                $scope.conversation(allConv[0].emisor)
            } 
            else if($scope.currentUser.username.localeCompare(allConv[0].receptor)!=0){
                console.log("receptor: "+allConv[0].receptor)
                $scope.conversation(allConv[0].receptor)
            }
        }
    
    })
    
    $scope.conversation = function(user){
        document.getElementById("conv-name").textContent=user
        $scope.currentConvUser = user
        
        var aux=[]
        for(var i=0; i<allConv.length; i++){
            if($scope.currentConvUser.localeCompare(allConv[i].emisor)==0){
                aux.push(allConv[i])
            } 
            else if($scope.currentConvUser.localeCompare(allConv[i].receptor)==0){
                aux.push(allConv[i])
            }
        }
        $scope.currentConversation = aux
    }
    
    $scope.sendMsg = function(){
        if($scope.textBody){
            MessageSvc.send({
                emisor: $scope.currentUser.username,
                receptor: $scope.currentConvUser,
                textBody: $scope.textBody
            }).success(function (msg){
                $scope.currentConversation.push(msg)
                $scope.textBody = null
            })
        }
    }
})