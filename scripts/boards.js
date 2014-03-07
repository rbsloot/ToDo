/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BoardsCtrl($scope, $http) {
    alert("init");
    
    $scope.boards = [{
            id:3,
            name:"MyBoard",
            active:false
    }, {
        id:6,
        name:"Board2",
        active:false
    }];

    $scope.getBoards = function() {
        $http.get('http://localhost/todo/api/board',{params:{param:"value"}})
        .success(function(data, status, headers, config) {
            //alert("complete");
            console.log(data);
        }).error(function(data, status, headers, config) {
            //alert("failed");
            console.log(data);
        });
    }
    
    $scope.getBoards();
    
    $scope.test = function() {
        //alert("Hello board");
        console.log("Hello board");
    }
}
