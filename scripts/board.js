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
            list.board_id = $scope.boardid;
            $http({
                url:'/todo/api/list',
                method:'POST',
                data:list
            }).success(function(data, status, headers, config){			
//                $scope.errorMessage = null;				
//                $scope.getLists();
                list.id = data.id;
                list.tasks = [];
                $scope.board.lists.push(list);
            }).error(function(data, status, headers, config) {
				//An error has occured
            });
    }
	
	$scope.removeList = function(list) {
//            console.log(list);
            $http({
                url:'/todo/api/list',
                method:'DELETE',
                data:{id:list.id}
            }).success(function(data, status, headers, config){			
//                $scope.errorMessage = null;				
//                $scope.getLists();
                for(var i in $scope.board.lists) {
                    if(list.id == $scope.board.lists[i].id) {
                        $scope.board.lists.splice(i, 1);
                        break;
                    }
                }
            }).error(function(data, status, headers, config) {
		
            });
    }
	
	$scope.addTask = function(task, list) {
            task.list_id = list.id;
            task.name = task.addname;
            task.end_date = null;
            $http({
                url:'/todo/api/task',
                method:'POST',
                data:task
            }).success(function(data, status, headers, config){			
//                $scope.errorMessage = null;				
//                $scope.getLists();
                task.id = data.id;
                angular.forEach($scope.board.lists, function(l) {
                    if(l.id == list.id) {
                        task.end_date = "0000-00-00 00:00:00";
                        list.tasks.push(task);
                    }
                });
            }).error(function(data, status, headers, config) { 	
				//An error has occured
            });
    }
	
	$scope.removeTask = function(task) {
//            console.log(task);
            $http({
                url:'/todo/api/task',
                method:'DELETE',
                data:{id:task.id}
            }).success(function(data, status, headers, config){			
//                $scope.errorMessage = null;				
//                $scope.getLists();
                var found = false;
                angular.forEach($scope.board.lists, function(l) {
                    for(var i in l.tasks) {
                        if(l.tasks[i].id == task.id) {
                            l.tasks.splice(i, 1);
                            found = true;
                            break;
                        }
                    }
                    if(found) return false;
                });
            }).error(function(data, status, headers, config) {
                
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
