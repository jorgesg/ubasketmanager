angular.module('app')
.controller('RosterCtrl', function($scope, TeamSvc, UserSvc){
  TeamSvc.getTeam($scope.currentUser.username)
  .then( function(response) {
      $scope.currentTeam = response.data
      UserSvc.getRoster($scope.currentUser.username)
      .then( function(response) {
          $scope.roster = response.data
      })
  })
  
  saveChanges = function() {
      TeamSvc.updateTeam($scope.currentUser.username, $scope.currentTeam)
      .then( function(response) {
          console.log(response)
          UserSvc.createRoster($scope.currentUser.username, $scope.roster)
          .then( function(response) {
              console.log(response)
              console.log('Team succesfully updated!')
          })
      })
  }
  
  /*DRAG AND DROP*/
    allowDrop = function(ev) {
        ev.preventDefault()
    }

    drag = function(ev) {
        for(var i=0; i<$scope.roster.length; i++){
            if($scope.roster[i].name == ev.target.id){
                ev.dataTransfer.setData("card", JSON.stringify($scope.roster[i]))
            }
        }
    }

    drop = function(ev) {
        ev.preventDefault()
        var data = JSON.parse(ev.dataTransfer.getData("card"))
        var index = getRosterIndex(data)
        if(data.pos=="Guard"){
            if(ev.target.getAttribute("id")=="guard1"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.guard1 = data
                ev.target.textContent = data.name
            }
            else if(ev.target.getAttribute("id")=="guard2"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.guard2 = data
                ev.target.textContent = data.name
            }
        }
        else if(data.pos=="Forward"){
            if(ev.target.getAttribute("id")=="forward1"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.forward1 = data
                ev.target.textContent = data.name
            }
            else if(ev.target.getAttribute("id")=="forward2"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.forward2 = data
                ev.target.textContent = data.name
            }
        }
        else if(data.pos=="Center"){
            if(ev.target.getAttribute("id")=="center"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.center = data
                ev.target.textContent = data.name
            }
        }
        else if(data.pos=="6Man"){
            if(ev.target.getAttribute("id")=="sixthman"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.sixthman = data
                ev.target.textContent = data.name
            }
        }
        else if(data.pos=="Coach"){
            if(ev.target.getAttribute("id")=="coach"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.coach = data
                ev.target.textContent = data.name
            }
        }
    }
    
    getRosterIndex = function(obj){
        var index=0
        for(var i=0; i<$scope.roster.length; i++){
            if($scope.roster[i]._id == obj._id){
                return index=i
            }
        }
    }
})