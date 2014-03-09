/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BoardCtrl($scope, $stateParams, $http) {
    $scope.boardid = $stateParams.boardid;
    $scope.taskid = $stateParams.taskid;    
    
    $scope.init = function() {
        //alert("start broadcast");
        //console.log($stateParams);
        $scope.$root.$broadcast("tabChanged",{id:$stateParams.boardid});
        angular.element($(".board-container")).scope().activeBoardId = $scope.boardid;
    }
    
    $scope.board = {
        id:$stateParams.boardid
    };
    
    $scope.getLists = function() {
        $http({
            url:'/todo/api/list',
            method:'GET',
            params:{ bid:$scope.boardid }
        }).success(function(data, status, headers, config) {
            $scope.board.lists = data;
            console.log("done loading lists");
        }).error(function(data, status, headers, config) {
            console.log("error loading lists");
        });
    }
    $scope.getLists();
    
    $scope.getBoardLists = function() {
        if($scope.board.id == 3) {
            return [{
                    id:1,
                    name:"List1",
                    tasks: [{
                        id:1,
                        name:"test"
                    }, {
                        id:2,
                        name:"test2"
                    }]
                }, {
                    id:2,
                    name:"List2",
                    tasks: [{
                        id:1,
                        name:"test"
                    }, {
                        id:2,
                        name:"test2"
                    }, {
                        id:3,
                        name:"test3"
                    }, {
                        id:4,
                        name:"test4"
                    }]
                }, {
                    id:3,
                    name:"List3"
                }];
        }
        else {
            return [{
                    id:1,
                    name:"List1",
                    tasks: [{
                        id:1,
                        name:"test"
                    }, {
                        id:2,
                        name:"test2"
                    }]
                }, {
                    id:2,
                    name:"List2",
                    tasks: [{
                        id:1,
                        name:"test"
                    }, {
                        id:4,
                        name:"test4"
                    }]
                }, {
                    id:3,
                    name:"List3",
                    tasks: [{
                        id:10,
                        name:"somethin"
                    }]
                }];
        } 
    }
    
    //$scope.board.lists = $scope.getBoardLists();
    
    $scope.testTask = function() {
        console.log($stateParams);
        alert("State params: " + $stateParams.boardid + ", " + $stateParams.taskid);
    }
    
    $scope.init();
}
