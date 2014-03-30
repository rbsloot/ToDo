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
      
      this.editBoard = function(editName, id) {
          $scope.editBoard(editName, id);
      }
      
      this.removeBoard = function(bid) {
          $scope.removeBoard(bid);
      }

//      this.setTabTemplate = function (templateUrl) {
//        $scope.templateUrl = templateUrl;
//      }

      this.addBoardTab = function (tab) {
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
      
      this.callFunc = function(funcName, value) {
          $scope[funcName](value);
      }
    },
    template:
      '<div class="full-height">' +
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
.directive('ngBoardTab', function () {
  return {
    restrict: 'E',
    replace: true,
    require: '^ngTabset',
    scope: {
      title: '@',
      templateUrl: '@'
    },
    link: function(scope, element, attrs, tabsetController) {
        scope.editMode = false;
        
        if(attrs.boardid)
            scope.id = attrs.boardid;
//        if(!scope.board) {
//            scope.board = {};
//        }
        
        tabsetController.addBoardTab(scope);
        
        scope.editName = scope.board.name;
        
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
        
        scope.editClick = function() {
            if(scope.editMode) {
                // Handle edit value, scope.editName
                if(scope.editName && scope.editName != scope.board.name) {
                    tabsetController.editBoard(scope.editName, scope.id);
                }
            }
            scope.editMode = !scope.editMode;
        }
        
        scope.removeClick = function() {
            if(scope.editMode) {
                scope.editMode = !scope.editMode;
            } else {
                //console.log(tabsetController);
                tabsetController.removeBoard(scope.id);
            }
        }
    },
    template:
      '<li ng-class="{active: board.active}">' +
        //'<button class="close-btn" type="button">X</button>' +
        '<a style="display:inline-flex;" ui-sref="main.board({boardid:board.id})" ng-click="select()">' +
            '<span ng-show="!editMode">{{ board.name }} </span>' +
            '<form ng-submit="editClick()" ng-show="editMode" class="form-inline"><input type="text" ng-model="editName" class="form-control input-tab input-sm" placeholder="Board name" id="edit-board-text" required /></form>' +
            '<button ng-click="editClick()" class="btn btn-default btn-xs" type="button"><span class="glyphicon glyphicon-pencil"></span></button>' +
            ' ' +
            '<button ng-click="removeClick()" class="btn-tab-remove btn btn-default btn-xs" type="button"><span class="glyphicon glyphicon-remove"></span></button></a>' +
      '</li>'
  };
})
.directive('ngAddTab', function() {
return {
    restrict: 'E',
    replace: true,
    require: '^ngTabset',
    scope: {
      title: '@',
      templateUrl: '@'
    },
    link: function(scope, element, attrs, tabsetController) {

        scope.type = (attrs.type) ? attrs.type : "text";
        scope.placeholder = (attrs.placeholder) ? attrs.placeholder : "";
        scope.bType = (attrs.btype) ? attrs.btype : "default";
        scope.functionName = (attrs.funcname) ? attrs.funcname : "";
        
        scope.addValue;

        scope.callFunc = function() {
            tabsetController.callFunc(scope.functionName, scope.addValue);
        }

//        scope.select = function () {
////            alert("Tab selected");
//            tabsetController.selectTab(scope.board);
//        }
    },
    template:
      '<li>' +
        '<form ng-submit="callFunc()" class="form-inline navbar-form"><input ng-model="addValue" class="form-control input-tab input-sm" type="{{type}}" placeholder="{{placeholder}}" /><button type="submit" class="btn btn-{{bType}} btn-tab btn-xs"><i class="glyphicon glyphicon-plus"> </i></button></form>' +
      '</li>'
  };
})
