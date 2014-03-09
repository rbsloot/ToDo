/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BoardsCtrl($scope, $http) {
    //alert("init BoardsCtrl");
    
    $scope.activeBoardId = -1;
    $scope.testName = "testVal";
    $scope.boards = [{
            id:-1,
            name:"Loading..."
    }];
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
        $http.get('/todo/api/board',{params:{token:"test"}})
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
    
    $scope.test = function() {
        //alert("Hello board");
        console.log("Hello board");
    }
}
