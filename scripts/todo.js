/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('todo',['ui.router', 'ui.bootstrap','bootstrap.tabset'])
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider.state('main', {
        url:'/home',
        views: {
            "content":{templateUrl:'templates/main.html', controller:'BoardsCtrl'},
            "schedule":{templateUrl:'templates/schedule.html', controller:'ScheduleCtrl'}
        }
    }).state('login', {
        url:'/login',
        title: 'Login',
        views: {
            "dialog":{templateUrl:'templates/login.html', controller:'UserCtrl'}
        }
    }).state('register', {
        url:'/register',
        title: 'Register',
        views: {
            "dialog":{templateUrl:'templates/register.html', controller:'UserCtrl'}
        }
    }).state('main.board.edittask', {
        url:'/task/:taskid',
        views: {
            "main-dialog":{templateUrl: 'templates/edittask.html', controller:'BoardCtrl'}
        }
    }).state('main.board',{
        url:'/b/{boardid}',
        views: {
            "tab-content":{templateUrl:'templates/board.html',controller:'BoardCtrl'}
        }
    });
    
    $urlRouterProvider.otherwise("/login");
    
})
.run(function($rootScope,$location, $state, $timeout) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
        if('title' in toState) {
            document.title = toState.title + " - ToDo";
        } else {
            document.title = "ToDo";
        }
        
        var $parent = $rootScope.$$childTail;
        // If not is logged in and page to go is not Login or Register Redirect to Login
        if(!$parent.isLogged && toState.name !== "login" && toState.name !== "register") {
            event.preventDefault();
            $state.transitionTo('login');
        } else {
            // If is logged in and page to go is Login or Register Redirect to Main
            if((toState.name === "login" || toState.name === "register") && $parent.isLogged) {
                event.preventDefault();
                $state.transitionTo('main');
            }
        }
    });
});

app.controller('MainCtrl', function ($scope) {
    $scope.isLogged = !!(localStorage.token);
     
    $scope.$back = function() {
        window.history.back();
    }
});
