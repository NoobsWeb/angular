/* 岗位管理首页 */

appModule.controller('manage-table', function($scope, $http) {

  //来源公司与部门数据
  $http({method:'get',url:"/jy/static/manage_company.json"}).success(function(data){
    $scope.companys = data.company;
    $scope.part = data.part;
  });

  //表格数据
 	$http({method:'get',url:"/jy/static/table_1.json"}).success(function(data){
    $scope.items = data;
    $scope.pageCount = 100;
    $scope.dataCount = 1100;
  });

  //分页
  $scope.onPageChange = function() {
    // ajax request to load data
   	$http({method:'get',url:"/jy/static/table_"+$scope.currentPage+".json"}).success(function(data){
      $scope.items = data
  	});
  };

})

/* 岗位管理首页end  */

/* 用户画像 */
appModule.controller('manage-userImg', function($scope, $http, $routeParams) {
  //接收传过来的id和工作 
  $scope.pid = $routeParams.id;
  $scope.work = $routeParams.work;
  $scope.enterTime = $routeParams.stTime;
  $scope.updateTime = $routeParams.upTime;
  $scope.imgSrc = 'static/images/pic.png';
  
  //info
  $http({method:'get',url:'/jy/static/userImg.json'}).success(function(data){
    $scope.duty = data[data.length-1];
    $scope.items = data;
    data.length = data.length-1;
  })


  //drawPie
  var myChart = echarts.init(document.getElementById('bar_chart'))
  $http({method:'get',url:"/jy/static/charts_pie.json"}).success(function(data){
    var bar = new barCharts();
    bar.option.xAxis.data = data.categories
    bar.option.series[0].data = data.data;
    myChart.setOption(bar.option)
  })
})

/* JD信息 */
appModule.controller('manage-jdInfo',function($scope,$http,$routeParams){
  $scope.pid = $routeParams.id;
  $scope.work = $routeParams.work;
  $scope.enterTime = $routeParams.stTime;
  $scope.updateTime = $routeParams.upTime;
  $http({method:'get',url:'/jy/static/jdInfo.json'}).success(function(data){
    $scope.langues = data[data.length-1];
    $scope.items = data;
    data.length = data.length-1;
  })
})

/* 决策洞察 */
appModule.controller('manage-view',function($scope,$http,$routeParams){
  $scope.pid = $routeParams.id;
  $scope.work = $routeParams.work;
  $scope.enterTime = $routeParams.stTime;
  $scope.updateTime = $routeParams.upTime;
   //表格数据
  $http({method:'get',url:"/jy/static/view_table.json"}).success(function(data){
    $scope.items = data;
    $scope.pageCount = 100;
  });

  //分页
  $scope.onPageChange = function() {
    // ajax request to load data
    $http({method:'get',url:"/jy/static/table_"+$scope.currentPage+".json"}).success(function(data){
      $scope.items = data
    });
  };

  //饼图
  var myChart1 = echarts.init(document.getElementById('target-company'))
  $http({method:'get',url:"/jy/static/pie1.json"}).success(function(data){
    var bar = new barCharts();
    bar.option.xAxis.data = data.categories
    bar.option.series[0].data = data.data;
    myChart1.setOption(bar.option)
  })
  var myChart2 = echarts.init(document.getElementById('now-company'))
  $http({method:'get',url:"/jy/static/pie2.json"}).success(function(data){
    var bar = new barCharts();
    bar.option.xAxis.type = 'value';
    bar.option.yAxis.data = data.categories;
    bar.option.yAxis.type = "category";
    bar.option.series[0].data = data.data;
    myChart2.setOption(bar.option)
  })
})

/*  人才匹配  */
appModule.controller('manage-talent',function($scope,$http,$routeParams){
  $scope.pid = $routeParams.id;
  $scope.work = $routeParams.work;
  $scope.enterTime = $routeParams.stTime;
  $scope.updateTime = $routeParams.upTime;
  $scope.part = $routeParams.part;
  $scope.count = $routeParams.count;
  $scope.company = $routeParams.company;
  $scope.match = "base";
  $scope.checkedItem = [];
  $http({method:'get',url:"/jy/static/match_base.json"}).success(function(data){
    $scope.items = data;
  })
  $http({method:'get',url:"/jy/static/table_talent.json"}).success(function(data){
    $scope.tb_items = data;
    $scope.pageCount = 100;
    $scope.dataCount = 1100;
  });

  $http({method:'get',url:"/jy/static/match_adda.json"}).success(function(data){
    $scope.match_add = data;
  });

  $http({method:'get',url:"/jy/static/match_higher.json"}).success(function(data){
    $scope.match_higher = data;
  });

  $scope.tab_base = function(target){
    $(target.target).addClass('active');
    $(target.target).siblings('button').removeClass('active')
    $scope.match = "base"
  }
  $scope.tab_higher = function(target){
    $(target.target).addClass('active');
    $(target.target).siblings('button').removeClass('active')
    $scope.match = "higher"
  }
  $scope.open_ul = function(target){
    event.stopPropagation()
    var btn_open = $(target.target);
    var status = btn_open.text();
    if(status == "+"){
      btn_open.parent().siblings('ul').addClass('open')
      btn_open.text("-");
    }else{
      btn_open.parent().siblings('ul').removeClass('open')
       btn_open.text("+")
    }
  }
  $scope.remove = function(item,event){
    for(var i=0;i<item.content.length;i++){
      if (this.content.$$hashKey == item.content[i].$$hashKey){
        item.content.splice(i,1)
      }
    }
  }
  $scope.addMatch = function(item,event){
    event.stopPropagation();
    $('.ul-match-add').hide();
    $(event.target).next().show()
  }
  $scope.checkTips = function(item,event){
    event.stopPropagation();
    var data_item = {};
    var arr=[];
    if ($(event.target).hasClass('checked')){
      $(event.target).removeClass('checked')
      $(event.target).parent().siblings('ul').find('.ul-check').removeClass('checked')
    }else if ($(event.target).hasClass('checkAll')){
      $(event.target).addClass('checked')
      $(event.target).parent().siblings('ul').find('.ul-check').addClass('checked')
    }else{
      var this_content = this.content.content;
      if (typeof(this_content) === "string"){
        data_item.content_right = this_content
        data_item.content_left = this.$parent.content.title;
        $scope.checkedItem.push(data_item)
      }else{
        console.log(this_content)
        for (var i=0;i<this_content.length;i++){
          data_item.content_right = this_content[i].content;
          data_item.content_left = this.content.title;
          $scope.checkedItem.push(data_item)
          data_item={}
        }
      }
      $(event.target).addClass('checked')
      $(event.target).parent().siblings('ul').find('.ul-check').addClass('checked')
    }
  }
  $scope.addMtachItem = function(item,event){
    event.stopPropagation();
    console.log(item.content)
    item.content = item.content.concat($scope.checkedItem)
    $scope.checkedItem = [];
  }
  document.addEventListener('click', function(){
    $('.ul-match-add').hide();
  })
})