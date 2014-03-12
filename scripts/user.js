/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function UserCtrl($scope, $http, $state) {
    
	$scope.login = function(user) {		
		console.log(user);
		$http({
			url:'/todo/api/user/login',
            method:'GET',
			params:user
		}).success(function(data, status, headers, config){			
			localStorage.setItem("token", data.token);
			$scope.errorMessage = null;
			$state.transitionTo('main');
		}).error(function(data, status, headers, config) {
			if(status == 404)
			{
				$scope.errorMessage = "Username and password combination doesn't exist";
			}	
		});
	}
}