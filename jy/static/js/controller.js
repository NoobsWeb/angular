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

/* 用户详情 */
appModule.controller('manage-userDetail',function($scope,$http,$routeParams){
  $scope.pid = $routeParams.id;
  $scope.work = $routeParams.work;
  $scope.enterTime = $routeParams.stTime;
  $scope.updateTime = $routeParams.upTime;
  $http({method:'get',url:'/jy/static/detail.json'}).success(function(data){
    $scope.items = data;
  })
  $scope.showList = function(item,event){
    
    if ($(event.target).hasClass('fa-plus-square')){
      $(event.target).parent().siblings('ul').show();
      $(event.target).removeClass('fa-plus-square').addClass('fa-minus-square')
    }else if ($(event.target).hasClass('fa-minus-square')){
      $(event.target).parent().siblings('ul').hide();
      $(event.target).removeClass('fa-minus-square').addClass('fa-plus-square')
    }
    var pFont,liHeight;
    if($(event.target).next().length !== 0){
      var len= $(event.target).parents('li').length;
      for(var i=0;i<len;i++){
        if($(event.target).parents('li').eq(i).next().length===0){
          liHeight= $(event.target).parents("li").eq(i).children('ul')[0].offsetHeight;
          console.log(liHeight);
          pFont=$(event.target).parents("li").eq(i).children('p');
          pFont.css({
            height:liHeight
          });
        }
      }
    }
  }
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
    if(btn_open.hasClass('fa-plus-square')){
      btn_open.parent().siblings('ul').addClass('open')
      btn_open.removeClass('fa-plus-square').addClass('fa-minus-square');
    }else{
      btn_open.parent().siblings('ul').removeClass('open')
      btn_open.removeClass('fa-minus-square').addClass('fa-plus-square');
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
      if(!this.content){
        console.log(1)
      }else{
        var item_data = this.content
        if (typeof(item_data.content) === "string"){
          data_item.content_right = item_data.content
          data_item.content_left = this.$parent.content.title;
          $scope.checkedItem.push(data_item)
        }else{
          (function (item_data){
            if (item_data.level === "third"){
              for (var i=0;i<item_data.content.length;i++){
                data_item.content_right = item_data.content[i].content;
                data_item.content_left = item_data.title;
                $scope.checkedItem.push(data_item)
                data_item={}
              }
            }else{
              for(var i=0;i<item_data.content.length;i++){
                arguments.callee(item_data.content[i])
              }
            }
          })(item_data)
        }
      }    
      $(event.target).addClass('checked')
      $(event.target).parent().siblings('ul').find('.ul-check').addClass('checked')
    }
  }
  $scope.addMtachItem = function(item,event){
    item.content = item.content.concat($scope.checkedItem)
    $scope.checkedItem = [];
  }
  document.addEventListener('click', function(){
    $('.ul-match-add').hide();
  })
})

/* 人才匹配人才画像 */
appModule.controller('match-userImg', function($scope, $http, $routeParams) {
  //接收传过来的id和工作 
  $scope.pid = $routeParams.id;
  $scope.imgSrc = 'static/images/pic.png';
  $http({method:'get',url:"/jy/static/match_userImg.json"}).success(function(data){
    $scope.userInfo = data;
  });
  $http({method:'get',url:'/jy/static/matchuserImg.json'}).success(function(data){
    $scope.items = data;
  })
})