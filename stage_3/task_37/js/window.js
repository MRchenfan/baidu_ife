define(['widget'],function(widget){

  function Window(){
    this.config={
      width:500,
      height:300,
      
      content:"自定义弹窗",
      title:"提示",
      text4alertBtn:"确定",
      text4confirmBtn:"确定",
      text4cancelBtn:"取消",

      isCloseBtn:true,
      skinClassName:null,
      isMask:true,
      isDraggable:true,
      dragHandle:".window-boundingBox"
    }

    widget.Widget.call(this);
  }
  $.extend(true, Window.prototype, new widget.Widget());


  Window.prototype.renderUI = function(){
      this.boundingBox=document.createElement("div");
      this.boundingBox.className="window-boundingBox";
      this.boundingBox.innerHTML=
        "<div class='window-boundingBox-header'></div>" +
        "<div class='window-boundingBox-content'></div>" +
        "<div class='window-boundingBox-footer'></div>";
      document.body.appendChild(this.boundingBox);

      $(".window-boundingBox-header")[0].innerHTML=this.config.title;
      $(".window-boundingBox-content")[0].innerHTML=this.config.content;
      if(this.config.winType=="alert"){
        $(".window-boundingBox-footer")[0].innerHTML = 
        "<div class='window-boundingBox-alert'>"+
          "<input class='window-boundingBox-alertBtn' type='button' value='" + this.config.text4alertBtn + "'>"+
        "</div>";
      }else if(this.config.winType=="confirm"){
        $(".window-boundingBox-footer")[0].innerHTML = 
        "<div class='window-boundingBox-alert'>"+
          "<input class='window-boundingBox-confirmBtn' type='button' value='" + this.config.text4confirmBtn + "'>"+
          "<input class='window-boundingBox-cancelBtn' type='button' value='" + this.config.text4cancelBtn + "'>"+
        "</div>";
      }else if(this.config.winType=="prompt"){
        $(".window-boundingBox-footer")[0].innerHTML = 
        "<div class='window-boundingBox-alert'>"+
          "<input type='text' class='window-boundingBox-promptText' />"+
          "<input class='window-boundingBox-confirmBtn' type='button' value='" + this.config.text4confirmBtn + "'>"+
          "<input class='window-boundingBox-cancelBtn' type='button' value='" + this.config.text4cancelBtn + "'>"+
        "</div>";
      }
      

      if(this.config.isCloseBtn){
        var closeBtnWrap=document.createElement("div");
        closeBtnWrap.className="window-boundingBox-closeBtn-wrap";
        closeBtnWrap.innerHTML=
          "<div class='window-boundingBox-closeBtn'>"+
            "<p></p><p></p>"+
          "</div>";
        this.boundingBox.appendChild(closeBtnWrap);
      }

      if(this.config.isMask){
        var mask=document.createElement("div");
        mask.className="window-boundingBox-mask";
        document.body.appendChild(mask);
      }
    };
  Window.prototype.bindUI = function(){
      var _this_=this;
      if(this.config.winType=="alert"){
        $(".window-boundingBox-alertBtn")[0].onclick=function(){
          _this_.fire("alert");
          _this_.destroy();
        }
      }
      
      if(this.config.winType=="confirm"||this.config.winType=="prompt"){
        $(".window-boundingBox-confirmBtn")[0].onclick=function(){
          _this_.fire("confirm");
          _this_.destroy();
        }
        $(".window-boundingBox-cancelBtn")[0].onclick=function(){
          _this_.fire("cancel");
          _this_.destroy();
        }
      }

      if(this.config.isCloseBtn){
        $(".window-boundingBox-closeBtn")[0].onclick=function(){
          _this_.fire("close");
          _this_.destroy();
        }
      }  
    };
  Window.prototype.syncUI = function(){
      this.boundingBox.style.width=this.config.width + "px";
      this.boundingBox.style.height=this.config.height + "px";
      this.boundingBox.style.left=(window.innerWidth-this.config.width)/2 + "px";
      this.boundingBox.style.top=(window.innerHeight-this.config.height)/2 + "px";
    };
  Window.prototype.destructor = function(){
      if(this.config.isMask){
        document.body.removeChild($(".window-boundingBox-mask")[0]);
      }
    };
  Window.prototype.alert = function(config){
      //实现配置合并
      this.config=$.extend(this.config,config);
      this.config.winType="alert";
      this.handlers={};
      this.render();
      return this;
    };
  Window.prototype.confirm = function(config){
      this.config=$.extend(this.config,config);
      this.config.winType="confirm";
      this.handlers={};
      this.render();
      return this;
    };
  Window.prototype.prompt = function(config){
      this.config=$.extend(this.config,config);
      this.config.winType="prompt";
      this.handlers={};
      this.render();
      return this;
    };

  return { Window:Window };
});
