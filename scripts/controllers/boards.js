/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('BoardsCtrl', function($scope, $rootScope, boards, $state) {
    //alert("init BoardsCtrl");
    //var $parent = $rootScope.$$childTail;
    $scope.activeBoardId = -1;
    $scope.testName = "testVal";
    $scope.boards = [{
            id:-1,
            name:"Loading..."
    }];

    var $root = $scope.$root.$$childHead;

    $scope.boardLoadCallback = function() {};
//    [{
//            id:3,
//            name:"MyBoard",
//            active:false
//    }, {
//        id:6,
//        name:$scope.testName,
//        active:false
//    }];

    //$scope.$watch('activeBoardId', $scope.setActive);
    
    $scope.getBoardIndexById = function(bid) {
        for(var i in $scope.boards) {
            if($scope.boards[i].id == bid) {
                return i;
            }
        }
        return -1;
    }
    
    $scope.getBoardById = function(bid) {
        return $scope.boards[$scope.getBoardIndexById(bid)];
    }
    
    $scope.setActive = function() {
        //alert("Active changed");
        angular.forEach($scope.boards, function(board) {
            if(board.id == $scope.activeBoardId) {
                board.active = true;
            }
        });
    }

    $scope.getBoards = function() {
        $root.isLoading = true;
        
        boards.getBoards(function(data, status, headers, config) {
            $scope.boards = data;
            
            $scope.setActive();
            $scope.boardLoadCallback();
            
            $root.isLoading = false;
        });  
    }
    
    $scope.getBoards();
    
   $scope.addBoard = function(boardName) {
       $root.isLoading = true;
       
       if(boardName) {
           boards.addBoard(boardName, function(data, status, headers, config) {
               var id = data.id;
               if(id && id != -1) {
                    $scope.boards.push({
                        id:id,
                        name:boardName
                    });
               }
               
               $root.isLoading = false;
           });
       }
   } 
   
   $scope.editBoard = function(editName, id) {
       $root.isLoading = true;
       
       boards.editBoard(editName, id, function(data, status, headers, config) {
           var i = $scope.getBoardIndexById(id);
          $scope.boards[i].name = editName;
          document.title = editName + " - ToDo";
          $scope.broadcastItemChanged();
          
          $root.isLoading = false;
       });
   }
   
   $scope.removeBoard = function(bid) {
       $root.isLoading = true;
       
       boards.removeBoard(bid, function(data, status, headers, config) {
           var index = $scope.getBoardIndexById(bid);
          $scope.boards.splice(index, 1);
          $state.transitionTo('main');
          $scope.broadcastItemChanged();
          
          $root.isLoading = false;
       });
   }
   
   $scope.broadcastItemChanged = function() {
        $scope.$root.$broadcast("itemChanged");
    }
});
