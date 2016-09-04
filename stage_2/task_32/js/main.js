$=function(el){
  return document.querySelector(el);
}
!(function(){
  var dataStorage=[];
  //构建表单对象
  function FormData(label,type,info,require){
    this.label=label;
    this.type=type;
    this.require=require;
    this.info=info;
    this.success=false;
    this.value=null;
  }
  FormData.prototype={
    constructor:FormData,
    validator:function(value){
      if(this.require&&value==""){
        return this.info="必填，不能为空";
      };
      switch(this.label){
        case "name":
          if(strLength(value)>3&&strLength(value)<17){
            this.success=true;
            this.value=value;
            return this.info="验证通过";
          }else{
            return this.info="必填，长度为4~16个字符";
          };
          break;
        case "password":
          if(/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(value)){
            this.success=true;
            this.value=value;
            return this.info="验证通过";
          }else{
            return this.info="必填，密码输入有误";
          };
          break;
          //密码重复验证怎么写比较好呢
        case "pw_repeat":
          break;
        case "email":
          if(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value)){
            this.success=true;
            this.value=value;
            return this.info="验证通过";
          }else{
            return this.info="必填，邮箱输入有误";
          };
          break;
        case "tel":
          if(/\d{11}/.test(value)){
            this.success=true;
            this.value=value;
            return this.info="验证通过";
          }else{
            return this.info="手机号码输入格式有误";
          };
      }
    }
  };
  //创建表单form-group
  function createFormGroup(newForm){
    var div=document.createElement("div");
    div.className="form-group";
    //label
    var lab=document.createElement("label");
    lab.setAttribute("for",newForm.label);
    //生成标签名
    switch(newForm.label){
      case "name":
        lab.innerHTML="姓名";break;
      case "password":
        lab.innerHTML="密码";break;
      case "pw_repeat":
        lab.innerHTML="重复密码";break;
      case "email":
        lab.innerHTML="邮箱";break;
      case "tel":
        lab.innerHTML="手机";break;
    }
    div.appendChild(lab);
    //input...
    var formType=document.createElement("input");
    formType.type=newForm.type;
    formType.name=newForm.label;
    div.appendChild(formType);
    //几种特有的输入框
    if(newForm.label=="name"||newForm.label=="password"||newForm.label=="email"
      ||newForm.label=="tel"){
      //p生成空的p标签
      var newP=document.createElement("p");
      div.appendChild(newP);
      formType.onfocus=function(){
        showInfo(this,newForm.info);
      }
      formType.onblur=function(){
        showInfo(this,newForm.validator(this.value));
      }
    }
    return div;
  }
  //新建对象
  
  /*
  tools
  */
  function showInfo(ele,info){
    getNextElement(ele.nextSibling).innerHTML=info;
    getNextElement(ele.nextSibling).style.display="block";
    if(info!="验证通过"){
      ele.style.borderColor="#FB1616";
    }else{
      ele.style.borderColor="#1BF41F";
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
  function getNextElement(node){
    if(node.nodeType==1){
      return node;
    };
    if(node.nextSibling){
      return getNextElement(node.nextSibling);
    };
    return null;
}
})();

