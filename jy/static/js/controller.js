/* 岗位管理首页 */
var host = "http://192.168.172.106:8080/"
appModule.config(function($httpProvider) {
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
      var query = '';
      var name, value, fullSubName, subName, subValue, innerObj, i;
  
      for (name in obj) {
        value = obj[name];
  
        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + '='
              + encodeURIComponent(value) + '&';
        }
      }
  
      return query.length ? query.substr(0, query.length - 1) : query;
    };
  
    return angular.isObject(data) && String(data) !== '[object File]'
        ? param(data)
        : data;
  }];
});
appModule.controller('manage-table', function($scope, $http) {

  //来源公司与部门数据
  $http({method:'get',url:host+"jyweb/jdinformation/querySourceCompanyAndDept.do"}).success(function(data){
    $scope.companyInfo = data.data
  });

  //搜索条件
  $scope.formInput={"positionNum":"","positionName":"","positionKeyword":"","sourceCompany":"","sourceDept":"","recruitState":"","pageNum":"","pageSize":""}

  //表格数据
 	$http({method:'get',url:host+"jyweb/jdinformation/query.do"}).success(function(data){
    $scope.items = data.data;
    $scope.pageCount = parseInt(data.count/10)+1;
    $scope.dataCount = data.count;
  });

  //分页
  $scope.onPageChange = function() {
    // ajax request to load data
    $scope.formInput.pageNum = $scope.currentPage
   	$http({method:'post',url:host+"jyweb/jdinformation/query.do",data:$scope.formInput}).success(function(data){
      $scope.items = data.data
    });
  };
  
  $scope.search = function(){
    $http({method:'post',url:host+"jyweb/jdinformation/query.do", headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:$scope.formInput}).success(function(data){
      $scope.items = data.data
    });
  }

  //下拉框
  $scope.showList = function(target){
    bfd.showListCommon(target)
  }
  $scope.choseList = function(item,className,target){
    if(!item)
      item="";
    bfd.choseList(item,className.class,target,$scope.formInput)
  }
  document.addEventListener('click', function(){
    $('input').siblings('ol').hide();
  })
})

/* 岗位管理首页end  */

/* 用户画像 */
appModule.controller('manage-userImg', function($scope, $http, $routeParams) {
  //接收传过来的id和工作 
  $scope.id = $routeParams.id;
  $scope.imgSrc = 'static/images/pic.png';
  $scope.itemInfo = {
    "jdInfo": {
      "title": "JD信息",
      "class": "jd",
      "icon": "fa-paper-plane"
    },
    "positionInfo": {
      "title": "岗位信息",
      "class": "work",
      "icon": "fa-book"
    },
    "positionRequire": {
      "title": "任职要求",
      "class": "need",
      "icon": "fa-check-circle-o"
    },
     "positionDuty": {
      "title": "岗位职责",
      "class": "duty",
      "icon": "fa-paste"
    }
  }
  $http({method:'post',url:host+"jyweb/jdinformation/queryTimePoint.do", headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:{id:$scope.id}}).success(function(data){
      $scope.infoData = data.data
  });
  //info
  $http({method:'get',url:host+'jyweb/jdinformation/portrait.do?id='+$scope.id}).success(function(data){
    $scope.items = data.data;
  })
})

/* 用户详情 */
appModule.controller('manage-userDetail',function($scope,$http,$routeParams){
  $scope.id = $routeParams.id;
  $http({method:'post',url:host+'jyweb/jdinformation/queryJdInformationDetail.do?id='+$scope.id}).success(function(data){
    $scope.items = data.data;
  })
  $http({method:'post',url:host+"jyweb/jdinformation/queryTimePoint.do", headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:{id:$scope.id}}).success(function(data){
      $scope.infoData = data.data
  });
  $scope.showList = function(item,event){
    bfd.tipsList(item,event)
  }
  $scope.closeAll = function(){
    bfd.allClose()
  }
})

/* JD信息 */
appModule.controller('manage-jdInfo',function($scope,$http,$routeParams){
  $scope.id = $routeParams.id;
  $http({method:'post',url:host+"jyweb/jdinformation/queryTimePoint.do", headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:{id:$scope.id}}).success(function(data){
      $scope.infoData = data.data
  });
  $http({method:'post',url:host+'jyweb/jdinformation/queryJdInfo.do?id='+$scope.id}).success(function(data){
    $scope.items = data.data;
  })

})

/* 决策洞察 */
appModule.controller('manage-view',function($scope,$http,$routeParams){
  $scope.id = $routeParams.id;
   
  $http({method:'post',url:host+"jyweb/jdinformation/queryTimePoint.do", headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:{id:$scope.id}}).success(function(data){
      $scope.infoData = data.data
  });

   //表格数据
  $http({method:'get',url:host+"jyweb/jdinformation/getAreaDecision.do?id="+$scope.id}).success(function(data){
    $scope.items = data.data;
    $scope.pageCount = parseInt(data.count/10)+1;
    $scope.dataCount = data.count;
  });

  //分页
  $scope.onPageChange = function() {
    // ajax request to load data
    $scope.formInput.pageNum = $scope.currentPage
    $http({method:'post',url:host+"jyweb/jdinformation/query.do", headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:$scope.formInput}).success(function(data){
      $scope.items = data.data
    });
  };

  //饼图
  var myChart1 = echarts.init(document.getElementById('target-company'))
  $http({method:'post',url:host+"jyweb/jdinformation/getTargetComDecision.do?id="+$scope.id}).success(function(data){
    var bar = new barCharts();
    bar.option.xAxis.data = data.data.categories
    bar.option.series[0].data = data.data.data;
    myChart1.setOption(bar.option)
  })
  var myChart2 = echarts.init(document.getElementById('now-company'))
  $http({method:'get',url:host+"jyweb/jdinformation/getCurrComDecision.do?id="+$scope.id}).success(function(data){
    var bar = new barCharts();
    bar.option.xAxis.type = 'value';
    bar.option.yAxis.data = data.data.categories;
    bar.option.yAxis.type = "category";
    bar.option.series[0].data = data.data.data;
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

/* 人才匹配用户详情 */
appModule.controller('match-userDetail',function($scope,$http,$routeParams){
  $scope.pid = $routeParams.id;
  $http({method:'get',url:"/jy/static/match_userImg.json"}).success(function(data){
    $scope.userInfo = data;
  });
  $http({method:'get',url:'/jy/static/detail.json'}).success(function(data){
    $scope.items = data;
  })
  $scope.showList = function(item,event){
    bfd.tipsList(item,event)
  }
  $scope.closeAll = function(){
    bfd.allClose()
  }
})
/* 人才匹配JD信息 */
appModule.controller('match-jdInfo', function($scope, $http, $routeParams) {
  //接收传过来的id和工作 
  $scope.pid = $routeParams.id;
  $scope.imgSrc = 'static/images/pic.png';
  $http({method:'get',url:"/jy/static/match_userImg.json"}).success(function(data){
    $scope.userInfo = data;
  });
  $http({method:'get',url:'/jy/static/match-jdInfo.json'}).success(function(data){
    $scope.langues = data[data.length-1];
    $scope.items = data;
    data.length = data.length-1;
  })
})
/*岗位录入*/
appModule.controller('postEntry', ['$scope', '$http', function($scope, $http) {
  $scope.nextStep1 = false;
  var arr = ["customerCompany","recruitNum","recruitReason","recruitState","positionName","positionDuty","qualification","belongIndustry","salaryScope"];
  $scope.entryItem = {
    "customerCompany": "",
    "targetCompany": "",
    "positionLevel": "",
    "recruitNum": "",
    "recruitReason": "",
    "recruitState": "",
    "positionName": "",
    "positionDuty": "",
    "belongIndustry": "",
    "salaryScope": "",
    "workPlace": "",
    "bussinesstripPlace":"",
    "bussinesstripRate":"",
    "belongDept":"",
    "reportTarget":"",
    "projectName":"",
    "projectPlace":"",
    "projectPosition":"",
    "projectDuty":"",
    "sex":"",
    "age":"",
    "workYear":"",
    "familyPlace":"",
    "marriageState":"",
    "education":"",
    "majorRequie":"",
    "is211":"",
    "is985":"",
    "fullTime":"",
    "certificateName":"",
    "havaSpouse":"",
    "addTime":"",
    "modifyTime":"",
    "country":"",
    "qualification":""
  };
  //下拉数据
  $http({method:'get',url:host+'jyweb/jdinformation/queryReference.do'}).success(function(data) {
    $scope.item = data.data;
  })
  //下拉选择
  $scope.showList = function(target){
    bfd.showListCommon(target)
  }
  $scope.choseList = function(item,className,target){
    if(!item)
      item="";
    bfd.choseList(item,className,target,$scope.entryItem)
  }
  document.addEventListener('click', function(){
    $('input').siblings('ol').hide();
  })
  $scope.next1 = function() {
    if($scope.salaryStartMust !== "" && $scope.salaryEndMust !== ""){
       $scope.entryItem.salaryScope = $scope.salaryStartMust +"-"+$scope.salaryEndMust;
    }
    if(!$scope.nextStep1){
      
      if($scope.entryItem.customerCompany !== "" && $scope.entryItem.recruitNum !== "" && $scope.entryItem.recruitReason !== "" && $scope.entryItem.recruitState !== "" && $scope.entryItem.salaryScope !== "" && $scope.entryItem.positionName !== "" && $scope.entryItem.positionDuty !== "" && $scope.entryItem.qualification !== "" && $scope.entryItem.belongIndustry !== ""){
        bfd.entryJson = $scope.entryItem
        $scope.nextStep1 = true;
      }else{
        alert("必填项不能为空")
      }
    }
    
    //判断必填项是否为真
  };
}]);

/*人才库start*/

/*人才列表*/
appModule.controller('talentPool', ['$scope', '$http', function($scope, $http) {
  
  /*全部简历数据*/
  $http({method: 'get', url:host+'jyweb/talent/queryTalent.do?keyword=&resumeType=0&pageNum=0&pageSize=10'}).success(function(data) {
      $scope.talentInfo = data.data;
      $scope.pageCount = data.count;
  });
  $scope.tableRadio1 = 'active';
  //切换简历
  $scope.changeResume = function(resumeType){
    $http({method: 'get', url:host+'jyweb/talent/queryTalent.do?keyword=&resumeType='+resumeType+'&pageNum=0&pageSize=10'}).success(function(data) {
      $scope.talentInfo = data.data;
      $scope.pageCount = data.count;
      $scope.tableRadio1 = '';
      $scope.tableRadio2 = '';
      $scope.tableRadio3 = '';
      if(resumeType == 0){
        $scope.tableRadio1 = 'active';
      }else if(resumeType == 1){
        $scope.tableRadio2= 'active';
      }else if(resumeType == 2){
        $scope.tableRadio3= 'active';
      }
    });
  }
}]);

/*人才画像*/
appModule.controller('talentPortrait', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $scope.id = $routeParams.id;
  $scope.source = $routeParams.source;
  $scope.uniqueId = $routeParams.uniqueId;
  $http({method:'get',url:host+"/jyweb/talent/queryMakeupInfo.do?uniqueId="+$scope.uniqueId}).success(function(data){
    console.log(data)
    $scope.userInfo = data.data;
  });
  $http({method: 'get', url:'/jy/static/match-jdInfo.json'}).success(function(data) {
    $scope.resumeInfo = data;
    $scope.resumeInfo.length = $scope.resumeInfo.length - 1;
  });
  $scope.recording = function(){
    $('#myModal').modal()
  }
  $scope.alee = function(){
    alert(1)
  }
}]).directive('modal', function() {
    return {
        restrict: 'E',
        template: bfd.modal(bfd.recording()),
        replace: true
    };
});

/*人才库end*/

/*人才地图*/
appModule.controller('talentMap', ['$scope','$http', function($scope, $http) {
  $scope.pageSize = 10
  //人才总数量
  $http({method:'get',url:host+'jyweb/talentMap/queryAllCvCount.do'}).success(function(data) {
    $scope.talentNum = bfd.format_number(data.data.all_cv_count);
  })

  //城市分布
  $http({method: 'get', url: host+'jyweb/talentMap/queryCvDisCity.do'}).success(function(data) {
    $scope.roleCityList = data.data;
    $scope.pageCount = parseInt(data.count/10)+1;
    $scope.dataCount = data.count;
  });
  $scope.onCityPageChange = function() {
    // ajax request to load data
    $scope.pageCityNum = $scope.currentPage;
    $http({method:'post',url:host+"jyweb/jdinformation/query.do", headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:{"pageNum":$scope.pageCityNum,"pageSize":$scope.pageSize}}).success(function(data){
      $scope.roleCityList = data.data
    });
  };
  //职能分布
  $http({method: 'get', url: host+'jyweb/talentMap/qeuryCvDisPos.do'}).success(function(data) {
    $scope.roleDutyList = data.data;
    $scope.pageCount = parseInt(data.count/10)+1;
    $scope.dataCount = data.count;
  });
  $scope.onDutyPageChange = function() {
    // ajax request to load data
    $scope.pageDutyNum = $scope.currentPage;
    $http({method:'post',url:host+"jyweb/talentMap/qeuryCvDisPos.do", headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:{"pageNum":$scope.pageDutyNum,"pageSize":$scope.pageSize}}).success(function(data){
      $scope.roleDutyList = data.data
    });
  };
  //折线图
  var myChart1 = echarts.init(document.getElementById('talent-line'));
  $http({method:'post',url:host+"jyweb/talentMap/queryCvDisTime.do"}).success(function(data){
    var line = new lineCharts();
    line.option.xAxis.data = data.data.categories
    line.option.series[0].data = data.data.data;
    myChart1.setOption(line.option)
  })
  var myChart2 = echarts.init(document.getElementById('talent-bar'));
  $http({method:'get',url:host+"jyweb/talentMap/queryCvDisCompany.do"}).success(function(data){
    var bar = new barCharts();
    bar.option.xAxis.data = data.data.categories
    bar.option.series[0].data = data.data.data;
    myChart2.setOption(bar.option)
  })
  var myChart3 = echarts.init(document.getElementById('talent-bar2'));
  $http({method:'get',url:host+"jyweb/talentMap/queryCvDisAge.do"}).success(function(data){
    var bar = new barCharts();
    bar.option.xAxis.type = 'value';
    bar.option.yAxis.data = data.data.categories;
    bar.option.yAxis.type = "category";
    bar.option.series[0].data = data.data.data;
    myChart3.setOption(bar.option)    
  })
}]);

/*公司分析start*/

/*公司列表*/
appModule.controller('companyList', ['$scope', '$http', function($scope, $http) {
  $scope.searchList = [];
  $scope.companyName = {};
  $http({method:'get', url: host+'jyweb/companyAnalysis/queryCompanyList.do'}).success(function(data) {
    $scope.companyList = data.data;
    for(var i in data.data){
      $scope.searchList.push(data.data[i].comDept)
    }
    $scope.searchList = bfd.unique($scope.searchList)
  });
  //下拉选择
  $scope.showList = function(target){
    bfd.showListCommon(target)
  }
  $scope.choseList = function(item,className,target){
    if(!item)
      item="";
    bfd.choseList(item,'companyName',target,$scope.companyName)
  }
  document.addEventListener('click', function(){
    $('input').siblings('ol').hide();
  })
  //搜索
  $scope.search = function(){
    $http({method:'post',url: host+'jyweb/companyAnalysis/queryCompanyList.do',data:$scope.companyName}).success(function(data){
      $scope.companyList = data.data
    });
  }
}]);

/*公司归一列表*/
appModule.controller('normalizeList', ['$scope', '$http', function($scope, $http) {
  $scope.searchList = [];
  $scope.companyName = {};
  $http({method: 'get', url: host+'jyweb/companyAnalysis/queryComUnification.do'}).success(function(data) {                      
    $scope.normalizeList = data.data;
    for(var i in data.data){
      $scope.searchList.push(data.data[i].normalizationName)
    }
    $scope.searchList = bfd.unique($scope.searchList)
  });
  //下拉选择
  $scope.showList = function(target){
    bfd.showListCommon(target)
  }
  $scope.choseList = function(item,className,target){
    if(!item)
      item="";
    bfd.choseList(item,'companyName',target,$scope.companyName)
  }
  document.addEventListener('click', function(){
    $('input').siblings('ol').hide();
  })
  //搜索
  $scope.search = function(){
    $http({method:'post',url:  host+'jyweb/companyAnalysis/queryComUnification.do',data:$scope.companyName}).success(function(data){
      $scope.normalizeList = data.data
    });
  }
  //删除
  $scope.delete = function(id){
    $http({method:'post',url: host+'jyweb/companyAnalysis/delete.do?id='+id}).success(function(data){
      $http({method: 'get', url: host+'jyweb/companyAnalysis/queryComUnification.do'}).success(function(data){                   
        $scope.normalizeList = data.data;
        $scope.searchList = [];
        for(var i in data.data){
          $scope.searchList.push(data.data[i].normalizationName)
        }
        $scope.searchList = bfd.unique($scope.searchList)
      });
    });
  }
}]);

/*企业信息*/
appModule.controller('companyInfo', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $scope.infoId = $routeParams.id;
  $scope.customerName = $routeParams.customerName;
  $scope.searchList = [];
  $scope.deptName = {};
  $http({method: 'post', url: host+'jyweb/companyAnalysis/queryCompanyDeptInfo.do?companyName='+$scope.customerName}).success(function(data) {
    $scope.companyInfoList = data.data;
    for(var i in data.data){
      $scope.searchList.push(data.data[i].comDept)
    }
    $scope.searchList = bfd.unique($scope.searchList)
  });
  $scope.showList = function(target){
    bfd.showListCommon(target)
  }
  $scope.choseList = function(item,className,target){
    if(!item)
      item="";
    bfd.choseList(item,'deptName',target,$scope.deptName)
  }
  document.addEventListener('click', function(){
    $('input').siblings('ol').hide();
  })
  //搜索
  $scope.search = function(){
    $http({method:'post',url: host+'jyweb/companyAnalysis/queryCompanyDeptInfo.do?companyName='+$scope.customerName,data:$scope.deptName}).success(function(data){
      $scope.companyInfoList = data.data
    });
  }
}]);

/*部门信息*/
appModule.controller('departInfo', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $scope.customerName = $routeParams.customerName;
  $scope.departId = $routeParams.id;
  $scope.departName = $routeParams.departName;
  $scope.searchList = [];
  $scope.positionName = {};
  $http({method: 'post', url: host+'jyweb/companyAnalysis/getPositionInfo.do?companyName='+$scope.customerName+'&deptName='+$scope.departName}).success(function(data) {
    console.log(data)
    $scope.jobList = data.data;
    for(var i in data.data){
      $scope.searchList.push(data.data[i].comDept)
    }
    $scope.searchList = bfd.unique($scope.searchList)
  });
  $scope.showList = function(target){
    bfd.showListCommon(target)
  }
  $scope.choseList = function(item,className,target){
    if(!item)
      item="";
    bfd.choseList(item,'positionName',target,$scope.positionName)
  }
  document.addEventListener('click', function(){
    $('input').siblings('ol').hide();
  })
  //搜索
  $scope.search = function(){
    $http({method:'post',url: host+'jyweb/companyAnalysis/getPositionInfo.do?companyName='+$scope.customerName+'&deptName='+$scope.departName,data:$scope.positionName}).success(function(data){
      $scope.jobList = data.data
    });
  }
}]);

/*目标公司*/
appModule.controller('targetCompany', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $scope.targetId = $routeParams.id;
  $scope.customerName = $routeParams.customerName;
  $scope.searchList = [];
  $scope.deptName = {};
  $http({method: 'post', url: host+'jyweb/companyAnalysis/queryTargetComInfo.do?companyName='+$scope.customerName}).success(function(data) {
    $scope.targetList = data.data;
    for(var i in data.data){
     $scope.searchList.push(data.data[i].comDept)
    }
    $scope.searchList = bfd.unique($scope.searchList)
  });
  $scope.showList = function(target){
    bfd.showListCommon(target)
  }
  $scope.choseList = function(item,className,target){
    if(!item)
      item="";
    bfd.choseList(item,'deptName',target,$scope.deptName)
  }
  document.addEventListener('click', function(){
    $('input').siblings('ol').hide();
  })
  //搜索
  $scope.search = function(){
    $http({method:'post',url: host+'jyweb/companyAnalysis/queryTargetComInfo.do?companyName='+$scope.customerName,data:$scope.deptName}).success(function(data){
      $scope.targetList = data.data
    });
  }

}]);

/*公司分析end*/