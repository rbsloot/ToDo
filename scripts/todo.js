/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('todo',['ui.router', 'ui.bootstrap','bootstrap.tabset'])
.config(function($stateProvider, $urlRouterProvider) {
//    var main = {
//        name: 'main',
//        url: '/',
//        templateUrl:'templates/main.html'
//    },
//    login = {
//        name: 'login',
//        url: '/login',
//        parent: main,
//        templateUrl: 'templates/login.html'
//    },
//    register = {
//        name:'register',
//        url:'/register',
//        parent: main,
//        templateUrl: 'templates/register.html'
//    };
//    
//    $stateProvider.state(main);
//    $stateProvider.state(login);
//    $stateProvider.state(register);
    
    $stateProvider.state('main', {
        url:'/home',
        views: {
            "content":{templateUrl:'templates/main.html', controller:'BoardsCtrl'}
        }
    }).state('login', {
        url:'/login',
        views: {
            //"content":{template: "<h1>Hello world</h1>"},
            "dialog":{templateUrl:'templates/login.html'}
        }
    }).state('register', {
        url:'/register',
        views: {
            "dialog":{templateUrl:'templates/register.html'}
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
    
    $urlRouterProvider.otherwise("/");
    
})
.run(function($rootScope,$location) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
        console.log('routechangestart');
        console.log(toState);
        console.log(toParams);
        console.log(fromState);
        //$location.path('/login');
    });
})
.controller('MainCtrl', function($scope, $state) {
    
    $scope.openDialog = function(dialog) {
        $state.transitionTo(dialog);
    }
})
.controller('LoginCtrl', function($scope) {
    
})
.controller('RegisterCtrl', function($scope) {
    
});
