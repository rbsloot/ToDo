/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BoardsCtrl($scope, $rootScope,$http, $state) {
    //alert("init BoardsCtrl");
    //var $parent = $rootScope.$$childTail;
    $scope.activeBoardId = -1;
    $scope.testName = "testVal";
    $scope.boards = [{
            id:-1,
            name:"Loading..."
    }];

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
        $http.get('/todo/api/board',{params:{token:localStorage.getItem("token")}})
        .success(function(data, status, headers, config) {
            //alert("complete");
            console.log(data);
            $scope.boards = data;
//            [{
//                    id:3,
//                    name:"MyBoard",
//                    active:false
//            }, {
//                id:6,
//                name:data,
//                active:false
//            }];
        $scope.setActive();
        $scope.boardLoadCallback();
        
        }).error(function(data, status, headers, config) {
            //alert("failed");
            
            //console.log(data);
            //$scope.testName = data;
//            $scope.testName = data;
//            $scope.boards = [{
//                    id:3,
//                    name:"MyBoard",
//                    active:true
//            }, {
//                id:6,
//                name:$scope.testName,
//                active:false
//            }];
        });
    }
    
    $scope.getBoards();
    
   $scope.addBoard = function(boardName) {
       if(boardName) {
           $http({
               url:"/todo/api/board",
               method:"POST",
               data:{bName:boardName,token:localStorage.token}
           }).success(function(data, status, headers, config) {
               var id = data.id;
               if(id && id != -1) {
                    $scope.boards.push({
                        id:id,
                        name:boardName
                    });
               }
           }).error(function(data, status, headers, config) {
               alert("Something went wrong while adding the new board, '"+boardName+"'");
           });
       }
   } 
   
   $scope.editBoard = function(editName, id) {
      $http({
          url:"/todo/api/board",
          method:"PUT",
          data:{bName:editName, bid:id}
      }).success(function(data, status, headers, config) {
          var i = $scope.getBoardIndexById(id);
          $scope.boards[i].name = editName;
          document.title = editName + " - ToDo";
          //callback();
      }).error(function(data, status, headers, config){
          console.log(data);
      });
//      callback();
   }
   
   $scope.removeBoard = function(bid) {
       $http({
          url:"/todo/api/board",
          method:"DELETE",
          data:{bid:bid}
      }).success(function(data, status, headers, config) {
          var index = $scope.getBoardIndexById(bid);
          $scope.boards.splice(index, 1);
          $state.transitionTo('main');
          //callback();
      }).error(function(data, status, headers, config){
          console.log(data);
      });
   }
}
