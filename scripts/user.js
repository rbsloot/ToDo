/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function UserCtrl($scope, $http, $state, $rootScope) {
        var $main = $rootScope.$$childHead;
        
	$scope.login = function(user) {		
            console.log(user);
            $http({
                url:'/todo/api/user/login',
                method:'GET',
                params:user
            }).success(function(data, status, headers, config){			
                localStorage.setItem("token", data.token);
                $scope.errorMessage = null;
                $main.isLogged = true;
                $state.transitionTo('main');
            }).error(function(data, status, headers, config) {
                if(status == 404) {
                    $scope.errorMessage = "Incorrect username and/or password";
                }	
            });
	}
        
    $scope.logout = function() {
           $http({
                url:'/todo/api/user/logout',
                method:'GET'
            }).success(function(data, status, headers, config){			
                localStorage.removeItem("token");
                $scope.errorMessage = null;
                $main.isLogged = false;
                $state.transitionTo('login');
            }).error(function(data, status, headers, config) {
                console.log(data);	
            });
    }
	
	$scope.register = function(user) {
		console.log(user);
		if(user.repeatPassword === user.password){	
            $http({
                url:'/todo/api/user/register',
                method:'GET',
                params:user
            }).success(function(data, status, headers, config){			
                $scope.errorMessage = null;
                $state.transitionTo('login');
            }).error(function(data, status, headers, config) {
                if(status == 409) {
                    $scope.errorMessage = "User already exists";
                }	
            });
		}else {			
			$scope.errorMessage = "Passwords are not the same";
		} 

	}
}