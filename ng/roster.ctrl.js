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
            if(ev.target.getAttribute("class")=="card1-img"||ev.target.getAttribute("id")=="guard1"||ev.target.getAttribute("id")=="guard1-name"||ev.target.getAttribute("id")=="guard1-ovr"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.guard1 = data
                document.getElementById("guard1-name").textContent = data.name
                document.getElementById("guard1-ovr").textContent = data.ovr
                  
            }
            else if(ev.target.getAttribute("class")=="card2-img"||ev.target.getAttribute("id")=="guard2"||ev.target.getAttribute("id")=="guard2-name"||ev.target.getAttribute("id")=="guard2-ovr"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.guard2 = data
                document.getElementById("guard2-name").textContent = data.name
                document.getElementById("guard2-ovr").textContent = data.ovr
                        
            }
        }
        else if(data.pos=="Forward"){
            if(ev.target.getAttribute("class")=="card3-img"||ev.target.getAttribute("id")=="forward1"||ev.target.getAttribute("id")=="forward1-name"||ev.target.getAttribute("id")=="forward1-ovr"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.forward1 = data
                document.getElementById("forward1-name").textContent = data.name
                document.getElementById("forward1-ovr").textContent = data.ovr
                 
            }
            else if(ev.target.getAttribute("class")=="card4-img"||ev.target.getAttribute("id")=="forward2"||ev.target.getAttribute("id")=="forward2-name"||ev.target.getAttribute("id")=="forward2-ovr"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.forward2 = data
                document.getElementById("forward2-name").textContent = data.name
                document.getElementById("forward2-ovr").textContent = data.ovr
                   
            }
        }
        else if(data.pos=="Center"){
            if(ev.target.getAttribute("class")=="card5-img"||ev.target.getAttribute("id")=="center"||ev.target.getAttribute("id")=="center-name"||ev.target.getAttribute("id")=="center-ovr"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.center = data
                document.getElementById("center-name").textContent = data.name
                document.getElementById("center-ovr").textContent = data.ovr
                   
            }
        }
        else if(data.pos=="6Man"){
            if(ev.target.getAttribute("class")=="card6-img"||ev.target.getAttribute("id")=="sixthman"||ev.target.getAttribute("id")=="sixthman-name"||ev.target.getAttribute("id")=="sixthman-ovr"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.sixthman = data
                document.getElementById("sixthman-name").textContent = data.name
                document.getElementById("sixthman-ovr").textContent = data.ovr
                    
            }
        }
        else if(data.pos=="Coach"){
            if(ev.target.getAttribute("class")=="card7-img"||ev.target.getAttribute("id")=="coach"||ev.target.getAttribute("id")=="coach-name"||ev.target.getAttribute("id")=="coach-ovr"){
                $scope.roster.splice(index, 1, data)
                $scope.currentTeam.coach = data
                document.getElementById("coach-name").textContent = data.name
                document.getElementById("coach-ovr").textContent = data.ovr
                   
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