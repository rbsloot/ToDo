/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.service('list', function($http) {
    
    var l_url = root_path + '/list';
    
    this.getLists = function(bid, success) {
        $http({
            url:l_url,
            method:'GET',
            params:{ bid:bid }
        }).success(success)
        .error(function(data, status, headers, config) {
            console.log("error loading lists");
        });
    }
    
    this.addList = function(addListName, bid, success) {
        var list = {};
        list.name = addListName;
        list.board_id = bid;
        $http({
            url:l_url,
            method:'POST',
            data:list
        }).success(function(data, status, headers, config){			
            list.id = data.id;
            list.tasks = [];
            data.list = list;
            success(data, status, headers, config);
        }).error(function(data, status, headers, config) {
            console.log(data);
        });
    }
	
    this.removeList = function(lid, success) {
        $http({
            url:l_url,
            method:'DELETE',
            data:{id:lid}
        }).success(success)
        .error(function(data, status, headers, config) {
            console.log(data);
        });
    }
	
    this.editList = function(list, success) {
        $http({
            url:l_url,
            method:"PUT",
            data:list
        }).success(success)
        .error(function(data, status, headers, config) {
            console.log(data);
        });
    }
});
