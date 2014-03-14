/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BoardsCtrl($scope, $rootScope,$http) {
    //alert("init BoardsCtrl");
    //var $parent = $rootScope.$$childTail;
    $scope.activeBoardId = -1;
    $scope.testName = "testVal";
    $scope.boards = [{
            id:-1,
            name:"Loading..."
    }];
    
    $scope.getCurrentDateStr = function() {
        var m_names = new Array("January", "February", "March", 
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December");

        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        
        return curr_date + " " + m_names[curr_month] + " " + curr_year;
    }
    
    $scope.currentDate = $scope.getCurrentDateStr();
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
    
    $scope.test = function(testValue) {
        //alert("Hello board");
        console.log(testValue);
        if(testValue) {
            alert("Testval: "+testValue);
        }
        
        console.log("Hello board");
    }
}
