/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ScheduleCtrl($scope, $http) {
    $scope.scheduleDays = 7;
    $scope.scheudleData = [];
    
    $scope.getSchedule = function() {
        $http({
            url:"/todo/api/task/getScheduledTasksForUser",
            method:"GET",
            params:{token:localStorage.token, days:$scope.scheduleDays}
        }).success(function(data, status, headers, config) {
            $scope.scheduleData = data;
            $scope.groupSchedule();
        }).error(function(data, status, headers, config) {
            console.log(data);
        });
    }
    
    $scope.getCurrentDateStr = function(addDays) {
        var m_names = new Array("January", "February", "March", 
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December");

        var d = new Date();
        var curr_date = (addDays) ? d.getDate() + addDays : d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        
        return curr_date + " " + m_names[curr_month] + " " + curr_year;
    }
    
    $scope.currentDate = $scope.getCurrentDateStr() + " - " + $scope.getCurrentDateStr($scope.scheduleDays);
    
    $scope.groupSchedule = function() {
        var boards = [];
        
        var sep = '$';
        angular.forEach($scope.scheduleData, function(taskData) {
            var board = $scope.createObj(taskData, 'board', sep);
            var b = $scope.searchForObjWithId(boards, board);
            if(b) board = b;
            if(!board.lists) board.lists = [];
            var list = $scope.createObj(taskData, 'list', sep);
            //$scope.searchForObjWithId(lists, list);
            var l = $scope.searchForObjWithId(board.lists, list);
            if(l) list = l;
            if(!list.tasks) list.tasks = [];
            var task = $scope.createObj(taskData, 'task', sep);
            list.tasks.push(task);
        });
        $scope.scheduleData = boards;
    }
    
    $scope.searchForObjWithId = function(array, searchObj) {
        var found = false;
        var foundObj = null;
        angular.forEach(array, function(o) {
            if(o.id == searchObj.id) {
                found = true;
                foundObj = o;
                return;
            }
        });
        if(!found) array.push(searchObj);
        return foundObj;
    }
    
    $scope.createObj = function(dataSource, search, separator) {
        var obj = {};
        for(var key in dataSource) {
            var value = dataSource[key];
            var objName = key.split(separator)[0];
            var propName = key.split(separator)[1];
            if(objName == search) {
                obj[propName] = value;
            }
        }
        return obj;
    }
    
    $scope.$on("itemChanged", function() {
        $scope.getSchedule();
    });
    
    $scope.getSchedule();
}
