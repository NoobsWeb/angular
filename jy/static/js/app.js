var appModule=angular.module('app', ['ngRoute','ng-pagination']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/alldata', {templateUrl: 'views/manage_job.html',controller:'manage-table'}).     
      otherwise({redirectTo: '/alldata'});
}]);
