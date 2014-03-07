/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

angular.module('bootstrap.tabset', [])
.directive('ngTabset', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    controller: function($scope) {
      //console.log($scope);
      //$scope.templateUrl = '';
      //var tabs = [];
      var controller = this;

      this.selectTab = function (tab) {
            angular.forEach($scope.boards, function (tab) {
                tab.active = false;
            });
            if(tab)
                tab.active = true;
      };
      
      this.selectTabWithId = function(id) {
          //console.log(tabs);
          angular.forEach($scope.boards, function (tab) {
              //console.log(tab.board);
                if(tab.id == id) {
                    //console.log(tab);
                    controller.selectTab(tab);
                }
          });
      }
      
      $scope.$on("tabChanged", function(event, args) {
          //alert("tab changed");
          //console.log($scope);
          controller.selectTabWithId(args.id);
      });

//      this.setTabTemplate = function (templateUrl) {
//        $scope.templateUrl = templateUrl;
//      }

      this.addTab = function (tab) {
            //console.log(tab);
            angular.forEach($scope.boards, function(board) {
                if(board.id == tab.id)
                    tab.board = board;
            });
            if ($scope.boards.length == 0) {
                controller.selectTab(tab);
            }
            //tabs.push(tab);
      };
    },
    template:
      '<div class="board-container">' +
//        '<div class="row-fluid">' +
          '<ul class="nav nav-tabs" ng-transclude></ul>' +
//        '</div>' +
        '<div class="board" ui-view="tab-content">' +
//          '<ng-include src="templateUrl">' +
//        '</ng-include>' +
//            '<div class="tab-content" ui-view="tab-content"></div>' +
        '</div>' +
      '</div>'
  };
})
.directive('ngTab', function () {
  return {
    restrict: 'E',
    replace: true,
    require: '^ngTabset',
    scope: {
      title: '@',
      templateUrl: '@'
    },
    link: function(scope, element, attrs, tabsetController) {

        if(attrs.boardid)
            scope.id = attrs.boardid;
//        if(!scope.board) {
//            scope.board = {};
//        }
        
        tabsetController.addTab(scope);
        
//        if(!attrs.boardid) {
//            scope.board.active = !!element.data("active");
//            scope.board.name = attrs.content;
//        }

        scope.select = function () {
//            alert("Tab selected");
            tabsetController.selectTab(scope.board);
        }

        scope.$watch('board.active', function () {
            console.log("active changed");
            if (scope.board.active) {
                //alert(scope.templateUrl);
                //tabsetController.setTabTemplate(scope.templateUrl);
            }
        });
    },
    template:
      '<li ng-class="{active: board.active}">' +
        '<a ui-sref="main.board({boardid:board.id})" ng-click="select()">{{ board.name }}</a>' +
      '</li>'
  };
});
