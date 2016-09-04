$=function(el){
  return document.querySelector(el);
}
//存放表单信息
var formData={
  name:null,
  password:null,
  email:null,
  tel:null
};
/*绑定事件*/
$("form").onsubmit=function(){
  return checkFormData();
}

function checkFormData(){
  var err=[];
  for(var attr in formData){
    if(formData[attr]==null){
      err.push(attr);
    };
  }
  err_str=err.join(",");
  if(err.length>0){
    alert(err_str+"显示输入有误");
    return false;
  }else{
    return true;
  };
}
//name
$("form")["name"].onblur=function(){
  var result=validate_name(this.value.trim());
  render(this,result);
}
//password
$("form")["password"].onblur=function(){
  var result=validate_password(this.value);
  render(this,result);
}
//password-repeat
$("form")["pw_repeat"].onblur=function(){
  var result=validate_pwRepeat(this.value);
  render(this,result);
}
//email
$("form")["email"].onblur=function(){
  var result=validate_email(this.value);
  render(this,result);
}
//tel
$("form")["tel"].onblur=function(){
  var result=validate_tel(this.value.trim());
  render(this,result);
}
/*渲染*/
function render(ele,result){
  //修改文本
  var info=getNextElement(ele.nextSibling);
  info.innerHTML=result;
  info.style.display="block";
  // 边框变色
  if(result!="验证通过"){
    ele.style.borderColor="#FB1616";
  }else{
    ele.style.borderColor="#1BF41F";
  };
}
/*tel验证*/
function validate_tel(tel){
  formData.tel=null;
  if(/\d{11}/.test(tel)){
    formData.tel=tel;
    return "验证通过";
  }else if(tel==""){
    return "不能为空";
  }else{
    return "手机号码输入格式有误";
  };
}
/*email验证*/
function validate_email(email){
  formData.email=null;
  if(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(email)){
    formData.email=email;
    return "验证通过";
  }else if(email==""){
    return "不能为空";
  }else{
    return "邮箱输入格式有误";
  };
}
/*密码重复验证*/
function validate_pwRepeat(pwr){
  if(pwr===formData.password){
    return "验证通过";
  }else{
    formData.password=null;
    $("form")["password"].value="";
    return "密码输入不一致";
  };
}
/*密码验证*/
function validate_password(password){
  formData.password=null;
  if(password==""){
    return "不能为空";
  }else if(/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(password)){
    formData.password=password;
    return "验证通过";
  }else{
    return "输入有误";
  };
}
/*姓名验证*/
function validate_name(name){
  formData.name=null;
  if(name==null||name==""){
    return "不能为空";
  }else if(strLength(name)<4||strLength(name)>16){
    //汉字要占两个字符
    return "长度为4~16个字符";
  }else{
    formData.name=name;
    return "验证通过";//表示通过
  };
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

//
function getNextElement(node){
    if(node.nodeType==1){
      return node;
    };
    if(node.nextSibling){
      return getNextElement(node.nextSibling);
    };
    return null;
}