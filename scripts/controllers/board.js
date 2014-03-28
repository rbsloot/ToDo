/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('BoardCtrl', function($scope, $stateParams, $state, list, task, $http) {
    $scope.boardid = $stateParams.boardid;
    $scope.taskid = $stateParams.taskid;
    $scope.board = {
        id:$stateParams.boardid
    };
    
    var $root = $scope.$root.$$childHead;
    
    function init() {
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
    
    $scope.getLists = function() {
        $root.isLoading = true;
        
        list.getLists($scope.boardid,function(data, status, headers, config) {
            $scope.board.lists = data;
            if($scope.taskid) {
                $scope.setSelectedTask($scope.taskid);
            }
            angular.forEach($scope.board.lists, function(list) {
                list.editableName = list.name;
            });
            console.log("done loading lists");
            $root.isLoading = false;
        });
    }
    
    $scope.addList = function(addListName) {
        $root.isLoading = true;
        
        list.addList(addListName, $scope.boardid, function(data, status, headers, config){			
            var l = data.list;
            $scope.board.lists.push(l);
            $scope.broadcastItemChanged();
            
            $root.isLoading = false;
        });
    }
	
    $scope.removeList = function(l) {
        $root.isLoading = true;
        
        list.removeList(l.id, function(data, status, headers, config){			
            for(var i in $scope.board.lists) {
                if(l.id == $scope.board.lists[i].id) {
                    $scope.board.lists.splice(i, 1);
                    break;
                }
            }
            $scope.broadcastItemChanged();
            
            $root.isLoading = false;
        });
    }

    $scope.editList = function(l) {
        $root.isLoading = true;
        
        list.editList(l, function(data, status, headers, config){
            $scope.broadcastItemChanged();
        });

        $state.transitionTo('main.board',{boardid:$scope.boardid});
        
        $root.isLoading = false;
    }
	
    $scope.addTask = function(addname, list) {
        $root.isLoading = true;
        
        task.addTask(addname, list.id, function(data, status, headers, config){			
            var t = data.task;
            angular.forEach($scope.board.lists, function(l) {
                if(l.id == list.id) {
                    t.end_date = "0000-00-00 00:00:00";
                    list.tasks.push(t);
                }					
            });
            $scope.broadcastItemChanged();
            
            $root.isLoading = false;
        });
    }
	
    $scope.removeTask = function(t) {
        $root.isLoading = true;
        
        task.removeTask(t.id, function(data, status, headers, config) {
            $scope.getTaskWithId(t.id, function(l, i) {
                l.tasks.splice(i, 1);
            });
            $scope.broadcastItemChanged();
            
            $root.isLoading = false;
        });
    }
    
    $scope.editTask = function(t) {
        $root.isLoading = true;
        
        t.end_date = t.end_date.replace("T", " ");
        var $parent = $scope.$parent;
        task.editTask(t, function(data, status, headers, config){
			
			console.log($parent.board);
			if($parent.board)
			{
				$scope.getTaskWithId(t.id, function(l, i) {
					l.tasks[i] = t;
					console.log($parent.board);
				}, $parent.board.lists);
			} else {
				$scope.getLists();
			}
					
            $scope.broadcastItemChanged();            
            $root.isLoading = false;
        });
        
        $state.transitionTo('main.board',{boardid:$scope.boardid});
    }
    
    $scope.getTaskWithId = function(id, handler, bLists) {
        var found = false;
        var lists = (bLists) ? bLists : $scope.board.lists ;
        angular.forEach(lists, function(l) {
            for(var i in l.tasks) {
                if(l.tasks[i].id == id) {
                    handler(l, i);
                    found = true;
                    break;
                }
            }
            if(found) return false;
        });
    }
	
	$scope.moveTask = function(fromInfo, toList)
	{
		var task = JSON.parse(fromInfo);
		var oldListId = task.list_id;

		if(toList != oldListId)
		{
			task.list_id = toList;
			$scope.editTask(task);
		}	
	}
		
	
    $scope.toggleEditor = function(list) {
        if(!list.editorEnabled) {
            list.editableName = list.name;
        } else {
            if(list.editableName && list.editableName != list.name) {
                list.name = list.editableName;
                $scope.editList(list);
            }
        }
        list.editorEnabled = !list.editorEnabled;
    };

    $scope.removeListPressed = function(list) {
        if(!list.editorEnabled) {
            $scope.removeList(list);
        } else {
            list.editorEnabled = !list.editorEnabled;
        }
    }
    
    $scope.broadcastItemChanged = function() {
        $scope.$root.$broadcast("itemChanged");
    }

    init();
    $scope.getLists();
});
