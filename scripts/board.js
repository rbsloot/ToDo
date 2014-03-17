/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BoardCtrl($scope, $stateParams, $state, $http) {
    $scope.boardid = $stateParams.boardid;
    $scope.taskid = $stateParams.taskid;
    
    $scope.checkValidBoard = function() {
        var $parent = $scope.$parent;
        var valid = false;
        if($parent.boards.length > 0) {
            angular.forEach($parent.boards, function(board) {
                if(board.id == $scope.boardid) {
                    valid = true;
                }
            });
        }
        if(!valid) {
            $state.transitionTo('main');
        }
    }
    
    $scope.init = function() {
        //alert("start broadcast");
        //console.log($stateParams);
        $scope.$root.$broadcast("tabChanged",{id:$stateParams.boardid});
        angular.element($(".board-container")).scope().activeBoardId = $scope.boardid;
        
        var $parent = $scope.$parent;
        var cb = $parent.boardLoadCallback;
        if($parent.boards.length == 1 && $parent.boards[0].id == -1) {
            $parent.boardLoadCallback = function() {
                cb();
                var board = $parent.getBoardById($scope.boardid);
                if(board) {
                    document.title = board.name + " - ToDo";
                }
            } 
        } else if($parent.boards.length > 0) {
            var board = $parent.getBoardById($scope.boardid);
            if(board) {
                document.title = board.name + " - ToDo";
            }
        }
        //$scope.checkValidBoard();
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
    
	$scope.addList = function(list) {
		list.boardId = $scope.boardid;
		$http({
                url:'/todo/api/list/post',
                method:'POST',
                data:list
            }).success(function(data, status, headers, config){			
                $scope.errorMessage = null;				
				$scope.getLists();
            }).error(function(data, status, headers, config) {
				//An error has occured
            });
    }
	
	$scope.removeList = function(list) {
		console.log(list);
		$http({
                url:'/todo/api/list/delete',
                method:'DELETE',
                params:list
            }).success(function(data, status, headers, config){			
                $scope.errorMessage = null;				
				$scope.getLists();
            }).error(function(data, status, headers, config) {
				alert("lege waarde");
            });
    }
	
	$scope.addTask = function(task, list) {
		task.listId = list.id;
		$http({
                url:'/todo/api/task/post',
                method:'POST',
                data:task
            }).success(function(data, status, headers, config){			
                $scope.errorMessage = null;				
				$scope.getLists();
            }).error(function(data, status, headers, config) { 	
				//An error has occured
            });
    }
	
	$scope.removeTask = function(task) {
		console.log("hoi hoi");
		console.log(task);
		$http({
                url:'/todo/api/task/delete',
                method:'DELETE',
                params:task
            }).success(function(data, status, headers, config){			
                $scope.errorMessage = null;				
				$scope.getLists();
            }).error(function(data, status, headers, config) {
				alert("lege waarde");
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
