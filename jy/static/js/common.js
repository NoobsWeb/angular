var bfd={}
//下拉菜单
bfd.entryJson = {}
bfd.showListCommon = function(target) {
 	target.stopPropagation();
  $(target.target).siblings('ol').show('400');
}
//下拉选择列表
bfd.choseList = function(item,className,target,scope) {
  if(!item){
    scope[className] = ""
    $(target.target).parents('ol').siblings('input').val("全部");
  }else{
    scope[className] = item;
    $(target.target).parents('ol').siblings('input').val(item);
  }	
	$(target.target).parents('ol').hide();
}
//标签系统
bfd.tipsList = function(item,event){
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
        pFont=$(event.target).parents("li").eq(i).children('p');
        pFont.css({
          height:liHeight
        });
      }
    }
  }
}
//标签系统全部收齐
bfd.allClose = function(){
  $('.treeformList').children('ul').find('ul').hide();
  $('.treeformList').find('span[ng-click]').removeClass('fa-minus-square').addClass('fa-plus-square')
}
//按钮高亮
bfd.initSidMenu = function(){
  var hash = window.location.hash.substring(2).split('/')[0];
  var tab_li = $('#sidebar ul li');
  tab_li.removeClass('active');
  if (hash.indexOf("manage") !== -1 || hash.indexOf("match") !== -1){
    tab_li.eq(0).addClass('active')
  }else if (hash == "talent"){
    tab_li.eq(1).addClass('active')
  }else if(hash == "talent_map"){
    tab_li.eq(2).addClass('active')
  }else if(hash.indexOf("company") !== -1){
    tab_li.eq(3).addClass('active')
  }
}
// modal 模板
bfd.modal = function(content){
  var modalDom = '<div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
              +'<div class="modal-dialog">'
              +'<div class="modal-content">'
              +'<div class="modal-header modal-header-background">'
              +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
              +'<h4 class="modal-title" id="modal-title-text">信息补录</h4>'
              +'</div>'
              +'<div class="modal-body">'
              + content
              +'</div></div></div></div>'
  return modalDom;
}
//简历补录模板
bfd.recording = function(){
  var modal_contant = '<div class="modal-body-title" style="border-bottom:1px solid #ccc;padding-bottom:10px">'
                      +'<h1 class="h1_title">'
                      +'李晓<span>ID:0001</span><span>猎聘网</span>'
                      +'</h1></div>'
                      +'<div class="modal-body-content" style="margin-top:20px">'
                      +'<div class="content-warp clearfix">'
                      +'<span class="modal-left">'
                      +'姓名：</span>'
                      +'<span class="modal-right">'
                      +'<input type="text" /></span></div>'
                      +'<div class="content-warp clearfix">'
                      +'<span class="modal-left">'
                      +'手机号码：</span>'
                      +'<span class="modal-right">'
                      +'<input type="text" /></span></div>'
                      +'<div class="content-warp clearfix">'
                      +'<span class="modal-left">'
                      +'电子邮箱：</span>'
                      +'<span class="modal-right">'
                      +'<input type="text" /></span></div>'
                      +'<div class="content-warp clearfix">'
                      +'<span class="modal-left">'
                      +'推荐状态：</span>'
                      +'<span class="modal-right">'
                      +'<input type="text" /></span></div>'
                      +'<div class="content-warp clearfix">'
                      +'<span class="modal-left">'
                      +'备注：</span>'
                      +'<span class="modal-right">'
                      +'<textarea></textarea></span></div>'
                      +'<div class="content-warp clearfix">'
                      +'<button>确定</button><button>取消</button>'
                      +'</div></div>'
  return modal_contant;
}
//处理数字
bfd.format_number = function(n) {
  var b=parseInt(n).toString();
  var len=b.length;
  if(len<=3){return b;}
  var r=len%3;
  return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
}
//数组去重
bfd.unique = function (arr){
  var result = [], hash = {};
  for (var i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[elem]) {
          result.push(elem);
          hash[elem] = true;
      }
  }
  return result;
}