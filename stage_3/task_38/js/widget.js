define([],function(){

  function Widget(){
    this.boundingBox=null;//属性，最外层容器
    this.handlers={};//属性，自定义事件
  }

  Widget.prototype={
    //接口
    renderUI:function(){},
    bindUI:function(){},
    syncUI:function(){},
    destructor:function(){},
    //方法
    render:function(){
      this.renderUI();
      this.bindUI();
      this.syncUI();
    },
    destroy:function(){
      this.destructor();
      this.boundingBox.parentNode.removeChild(this.boundingBox);
    },
    //自定义事件
    on:function(type,fn){
      if(typeof this.handlers[type]=="undefined"){
        this.handlers[type]=[];
      }
      this.handlers[type].push(fn);
      return this;
    },
    fire:function(type,data){
      if(this.handlers[type] instanceof Array){
        var handlers = this.handlers[type];
        for(var i=0;i<handlers.length;i++){
          handlers[i](data);
        }
      }
      return this;
    }
  }

  return { Widget:Widget }

});