var appModule=angular.module('app', ['ngRoute','ng-pagination']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/manage', {templateUrl: 'views/manage_job.html',controller:'manage-table'}).
      when('/manage_userImg/:id/:work', {templateUrl: 'views/manage_userImg.html',controller:'manage-userImg'}).     
      otherwise({redirectTo: '/manage'})
}])