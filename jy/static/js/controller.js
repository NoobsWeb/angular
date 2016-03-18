/* 岗位管理首页 */

appModule.controller('manage-table', function($scope, $http) {

  //来源公司与部门数据
  $http({method:'get',url:"/jy/static/manage_company.json"}).success(function(data){
    $scope.companys = data.company;
    $scope.part = data.part;
  });

  //表格数据
 	$http({method:'get',url:"/jy/static/table_1.json"}).success(function(data){
    $scope.items = data
  });

  //分页
  $scope.onPageChange = function() {
    // ajax request to load data
   	$http({method:'get',url:"/jy/static/table_"+$scope.currentPage+".json"}).success(function(data){
      $scope.items = data
  	});
  };

  // set pagecount in $scope
  $scope.pageCount = 100;
})

/* 岗位管理首页end  */

appModule.controller('manage-userImg', function($scope, $http, $routeParams) {
  //接收传过来的id和工作 
  $scope.pid = $routeParams.id;
  $scope.work = $routeParams.work;
  console.log($scope.pid)
})