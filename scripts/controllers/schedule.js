/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('ScheduleCtrl', function($scope, $http) {
    $scope.scheduleDays = 7;
    $scope.changingDays = $scope.scheduleDays;
    $scope.scheduleData = [];
    
    $scope.getSchedule = function() {
        $http({
            url:root_path+"/task/getScheduledTasksForUser",
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
        if(parseInt(addDays)) d.setDate(d.getDate() + parseInt(addDays));
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        
        return curr_date + " " + m_names[curr_month] + " " + curr_year;
    }
    
    $scope.setDateDiffStr = function() {
        $scope.currentDate = $scope.getCurrentDateStr() + " - " + $scope.getCurrentDateStr($scope.scheduleDays);
    }
    
    
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
    
    $scope.getRemainingTaskDays = function(task) {
        var taskDate = new Date(task.end_date);
        //var dTask = taskDate.getDate();
        
        var dNow = new Date();
        //var curr_date = dNow.getDate();
        
        var date = Math.round((taskDate-dNow)/(1000*60*60*24));
        return date;
    }
    
    $scope.getRemainingTaskDaysString = function(task) {
        var remaining = $scope.getRemainingTaskDays(task);
        
        switch(remaining) {
            case 0:
                return "Today";
            case 1:
                return "Tomorrow";
            default:
                return remaining + " days remaining";
        }
    }
    
    $scope.$on("itemChanged", function() {
        $scope.getSchedule();
    });
    
//    $scope.$watch("scheduleDays", function() {
//        $scope.currentDate = $scope.getCurrentDateStr() + " - " + $scope.getCurrentDateStr($scope.scheduleDays);
//    });

    $scope.setDateDiffStr();
    $scope.getSchedule();
});
