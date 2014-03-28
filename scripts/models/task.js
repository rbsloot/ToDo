/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.service('task', function($http) {
    
    var t_url = root_path + '/task';
    
    this.addTask = function(addname, lid, success) {
        var task = {};
        task.list_id = lid;
        task.name = addname;
        task.end_date = null;
        $http({
            url:t_url,
            method:'POST',
            data:task
        }).success(function(data, status, headers, config) {
            task.id = data.id;
            data.task = task;
            success(data, status, headers, config);
        }).error(function(data, status, headers, config) { 	
            console.log(data);
        });
    }
	
    this.removeTask = function(id, success) {
        $http({
            url:t_url,
            method:'DELETE',
            data:{id:id}
        }).success(success)
        .error(function(data, status, headers, config) {
            console.log(data);
        });
    }
    
    this.editTask = function(task, success) {
		console.log(task);
        task.end_date = task.end_date.replace("T", " ");
        $http({
            url:t_url,
            method:"PUT",
            data:task
        }).success(success)
        .error(function(data, status, headers, config) {
            console.log(data);
        });
    }
});
