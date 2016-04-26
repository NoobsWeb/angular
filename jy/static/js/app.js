var appModule=angular.module('app', ['ngRoute','ng-pagination']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/manage', {templateUrl: 'views/manage_job.html',controller:'manage-table'}).
      when('/manage_userImg/:id', {templateUrl: 'views/manage_userImg.html',controller:'manage-userImg'}).     
      when('/manage_userDetail/:id', {templateUrl: 'views/manage_userDetail.html',controller:'manage-userDetail'}).     
      when('/manage_jdInfo/:id', {templateUrl: 'views/manage_jdInfo.html',controller:'manage-jdInfo'}).     
      when('/manage_view/:id', {templateUrl: 'views/manage_view.html',controller:'manage-view'}).     
      when('/manage_talent/:id', {templateUrl: 'views/manage_talent.html',controller:'manage-talent'}).     
      when('/match_userImg/:id', {templateUrl: 'views/match_userImg.html',controller:'match-userImg'}).     
      when('/match_userDetail/:id', {templateUrl: 'views/match_userDetail.html',controller:'match-userDetail'}).     
      when('/match_jdInfo/:id', {templateUrl: 'views/match_jdInfo.html',controller:'match-jdInfo'}). 
      when('/manage_entry', {templateUrl: 'views/manage_entry.html', controller: 'postEntry'}).
      when('/manage_entry2', {templateUrl: 'views/manage_entry2.html', controller: 'postEntry'}).
      when('/manage_entry3', {templateUrl: 'views/manage_entry3.html', controller: 'postEntry'}).
      when('/talent', {templateUrl: 'views/talent.html', controller: 'talentPool'}).
      when('/talent_protrait/:id&:source&:uniqueId', {templateUrl: 'views/talent_portrait.html', controller: 'talentPortrait'}).
      when('/talent_map', {templateUrl: 'views/talent_map.html', controller: 'talentMap'}).
      when('/company_list', {templateUrl: 'views/company_list.html', controller: 'companyList'}).
      when('/company_normalize', {templateUrl: 'views/normalizeList.html', controller: 'normalizeList'}).
      when('/company_info/:id&:customerName', {templateUrl: 'views/companyInfo.html', controller: 'companyInfo'}).
      when('/company_depart/:id&:departName&:customerName', {templateUrl: 'views/depart_info.html', controller: 'departInfo'}).
      when('/company_target/:id&:customerName', {templateUrl: 'views/target_company.html', controller: 'targetCompany'}).
      otherwise({redirectTo: '/manage'})
}])