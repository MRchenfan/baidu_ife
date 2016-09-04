$=function(el){
  return document.querySelector(el);
}

$("#btn").onclick=function(){
  var result=validate_name($("#name").value.trim());
  $("#name-info").innerHTML=result;
}

//名称验证
/*
  实际上我想把验证函数和表现函数解耦，
  但是我们的验证结果有三个，这样就要设置一个
  约定标志，返回的标志来说明验证结果。
  我们可以看到前两个都是没有通过，当我们只需要
  两种状态时，第一种和第二种做同样的处理
*/
function validate_name(name){
  if(name==null||name==""){
    return "不能为空";
  }else if(strLength(name)<4||strLength(name)>16){
    //汉字要占两个字符
    return "长度为4~16个字符";
  }else{
    return false;//表示通过
  }
}
//字符长度
function strLength(str){
  var count=0;
  var patt= /[\u4e00-\u9fa5]/g ;
  while(patt.exec(str)!=null){
    count++;
  }
  return 2*count+(str.length-count);
}