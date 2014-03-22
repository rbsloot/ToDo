/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function TaskCtrl($scope, $stateParams, $state) {
    $scope.testTask = function() {
        console.log($stateParams);
        alert("State params: " + $stateParams.boardid + ", " + $stateParams.taskid);
    }
}
