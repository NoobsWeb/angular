(function (angular) {
  'use strict';
  angular.module("ng-modal", [])
   .directive("modal", ['ngModalConfig', function (ngModalConfig) {
      return {
        link: function (scope, element, attrs) {
          scope.pageChange = function (page) {
            if (page >= 1 && page <= scope.pageCount) {
              scope.currentPage = page;
            } else {
              scope.currentPage = 1;
            }
          }
        },
        replace: true,
        restrict: "E",
        scope: {
          onPageChange: '&'
        },
        template: '<div class="ng-pagination"><ul ng-if="pageCount>1 || showIfOnePage"><li ng-click="pageChange(1)" ng-if="showFirstLastText">{{firstText}}</li>' +
        '<li ng-click="pageChange(currentPage-1>0?currentPage-1:1)">{{prevText}}</li>' +
        '<li ng-repeat="pagenum in pagenums track by pagenum" ng-click="pageChange(pagenum)" ng-class="{active:currentPage===pagenum}">{{pagenum}}</li>' +
        '<li ng-click="pageChange(currentPage+1<=pageCount?currentPage+1:pageCount)">{{nextText}}</li>' +
        '<li ng-click="pageChange(pageCount)" ng-if="showFirstLastText">{{lastText}}</li></ul>' +
        '<lable ng-if="showGoto">{{gotoText}}<input type="text" ng-keyup="keyupHanlder($event)"></label></div>'
      }
    }]);
})(angular);
