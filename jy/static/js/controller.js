appModule.controller('manage-table', function($scope, $http) {
   $http({method:'get',url:"/jy/static/manage_company.json"}).success(function(data){
        $scope.companys = data.company;
        $scope.part = data.part;
    });
   	$http({method:'get',url:"/jy/static/table.json"}).success(function(data){
        $scope.items = data
    });
     $scope.onPageChange = function() {
      // ajax request to load data
     	$http({method:'get',url:"/jy/static/table_"+$scope.currentPage+".json"}).success(function(data){
	        $scope.items = data
    	});
    };

    // set pagecount in $scope
    $scope.pageCount = 100;
})