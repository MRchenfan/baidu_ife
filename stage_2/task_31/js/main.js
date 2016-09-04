(function(){
  $=function(el){
    return document.querySelector(el)
  }
  var schoolData={
    "合肥":["中国科学技术大学","合肥工业大学"],
    "北京":["清华大学","北京大学"],
    "上海":["复旦大学","复旦大学","复旦大学","复旦大学","复旦大学","复旦大学"]
  };
  //是否在校生
  $("form")["is-school"].forEach(function(item){
    item.onclick=function(){
      //这里不能设置为布尔值，是字符串
      if(this.value=="true"){
        $("#school-info").style.display="block";
        $("#not-school-info").style.display="none";
      }else{
        $("#not-school-info").style.display="block";
        $("#school-info").style.display="none";
      };
    }
  });
  /*选择城市后改变学校*/
  /*初始化选择框*/
  (function init(){
    //city
    for(var city in schoolData){
      var newOpt=document.createElement("option");
      newOpt.innerHTML=city;
      $("form").city.appendChild(newOpt);
    }
    //school
      $("form").school.appendChild(createFragment("合肥"));
  })();
  //给第一个选择框绑定事件
  $("form").city.onchange=function(){
    $("form").school.innerHTML=null;   
    $("form").school.appendChild(createFragment(this.value));
  }
  function createFragment(attr){
    var fragment=document.createDocumentFragment();
    schoolData[attr].forEach(function(item){
      var newOpt=document.createElement("option");
      newOpt.innerHTML=item;
      fragment.appendChild(newOpt);
    });
    return fragment;
  }
})();
