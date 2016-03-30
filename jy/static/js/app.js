var appModule=angular.module('app', ['ngRoute','ng-pagination']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/manage', {templateUrl: 'views/manage_job.html',controller:'manage-table'}).
      when('/manage_userImg/:id&:work&:stTime&:upTime', {templateUrl: 'views/manage_userImg.html',controller:'manage-userImg'}).     
      when('/manage_jdInfo/:id&:work&:stTime&:upTime', {templateUrl: 'views/manage_jdInfo.html',controller:'manage-jdInfo'}).     
      when('/manage_view/:id&:work&:stTime&:upTime', {templateUrl: 'views/manage_view.html',controller:'manage-view'}).     
      when('/manage_talent/:id&:work&:stTime&:upTime&:part&:count&:company', {templateUrl: 'views/manage_talent.html',controller:'manage-talent'}).     
      otherwise({redirectTo: '/manage'})
}])