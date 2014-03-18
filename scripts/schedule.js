/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ScheduleCtrl($scope, $http) {
    $scope.scheduleDays = 6;
    $scope.tasks = [];
    
    $scope.getSchedule = function() {
        $http({
            url:"/todo/api/task/getScheduledTasksForUser",
            method:"GET",
            params:{token:localStorage.token}
        }).success(function(data, status, headers, config) {
            $scope.tasks = data;
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
}
