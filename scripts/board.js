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
            if($scope.taskid) {
                $scope.setSelectedTask($scope.taskid);
            }
            console.log("done loading lists");
        }).error(function(data, status, headers, config) {
            console.log("error loading lists");
        });
    }
    
    $scope.setSelectedTask = function(taskid) {
        $scope.selectedTask = null;
        angular.forEach($scope.board.lists, function(list) {
            angular.forEach(list.tasks, function(task) {
                if(task.id == taskid) {
                    $scope.selectedTask = task;
                    $scope.selectedTask.end_date = $scope.selectedTask.end_date.replace(' ','T');
                    return false;
                }
            }); 
            if($scope.selectedTask) return false;
        });
    }
    
    //$scope.board.lists = $scope.getBoardLists();
    
    $scope.testTask = function() {
        console.log($stateParams);
        alert("State params: " + $stateParams.boardid + ", " + $stateParams.taskid);
    }
    
    $scope.init();
    $scope.getLists();
}
