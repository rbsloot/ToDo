/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('UserCtrl', function($scope, $http, $state, $rootScope) {
        var $main = $rootScope.$$childHead;
        var source = null;
        $scope.onlineUsers = 0;
        
        var u_url = root_path + "/user";
        
        // fout is de login controller update de waarde van zijn scope, alleen die "bestaat niet meer" na het inloggen
        
        $scope.getLoggedInUsers = function() {
            if(typeof(EventSource) !== "undefined") {
                source = new EventSource(u_url+"/countLogged");
                source.addEventListener('message', function(e) {
                    $scope.$apply(function() {
                        $scope.onlineUsers = e.data;
                    });
                    if(!$main.isLogged) { source.close(); }
                    //source.close();
                }, false);
                source.addEventListener('open', function(e) {
                    // Connection was opened.
                    console.log("connection open");
                }, false);
                source.addEventListener('error', function(e) {
                    if (e.readyState == EventSource.CLOSED) {
                        // Connection was closed.
                        console.log("connection closed");
                    }
                }, false);
            }
        }
        
        window.onbeforeunload = function() {
             $scope.setLoggedState('offline');
        }
        
        $scope.setLoggedState = function(state) {
            $http({
                url:u_url+'/logstate',
                method: 'PUT',
                data: {state:state, token:localStorage.token}
            }).success(function(data, status, headers, config) {
                console.log(data);
            }).error(function(data, status, headers, config) {
                console.log(data);
            });
        }
        
	$scope.login = function(user) {		
            console.log(user);
            $http({
                url:u_url+'/login',
                method:'GET',
                params:user
            }).success(function(data, status, headers, config){			
                localStorage.setItem("token", data.token);
                $scope.errorMessage = null;
                $main.isLogged = true;
                $state.transitionTo('main');
                $scope.getLoggedInUsers();
            }).error(function(data, status, headers, config) {
                if(status == 404) {
                    $scope.errorMessage = "Incorrect username and/or password";
                }	
            });
	}
        
    $scope.logout = function() {
           $http({
                url:u_url+'/logout',
                method:'GET',
                params:{token:localStorage.token}
            }).success(function(data, status, headers, config){			
                localStorage.removeItem("token");
                $scope.errorMessage = null;
                $main.isLogged = false;
                if(source) { source.close(); }
                $state.transitionTo('login');
            }).error(function(data, status, headers, config) {
                console.log(data);
                localStorage.removeItem("token");
            });
    }
	
    $scope.register = function(user) {
        console.log(user);
        if(user.repeatPassword === user.password){	
            $http({
                url:u_url+'/register',
                method:'POST',
                data:user
            }).success(function(data, status, headers, config){			
                $scope.errorMessage = null;
                //$state.transitionTo('login');
                $scope.login(user);
            }).error(function(data, status, headers, config) {
                if(status == 409) {
                    $scope.errorMessage = "User already exists";
                }	
            });
        }else {			
            $scope.errorMessage = "Passwords are not the same";
        } 

    }
    
    if($main.isLogged) {
        $scope.setLoggedState('online');
        $scope.getLoggedInUsers();
    }
    
});