require.config({
  paths:{}
});

require(['window'],function(w){

  $("#btn-alert")[0].onclick=function(){
    var win = new w.Window();
    win.alert({
      width:500,

      title:"第一个弹窗",
      content:"你是不是喜欢我啊",
      text4alertBtn:"OK",
      
      isCloseBtn:true,
      skinClassName:null,
      isMask:true,
      isDraggable:true,
      dragHandle:".window-boundingBox"
    });
    win.on("alert",function(){
      console.log("alert event");
    }).on("close",function(){
      console.log("close is closed")
    }).on("cancel",function(){
      console.log("cancel event")
    });
  }

  $("#btn-confirm")[0].onclick=function(){
    var win = new w.Window();
    win.confirm({
      width:500,

      title:"第一个弹窗",
      content:"你好漂亮",
      text4alertBtn:"OK",
      
      isCloseBtn:true,
      skinClassName:null,
      isMask:true,
      isDraggable:true,
      dragHandle:".window-boundingBox"
    });
    win.on("confirm",function(){
      console.log("confirm event");
    }).on("close",function(){
      console.log("close is closed")
    }).on("cancel",function(){
      console.log("cancel event")
    });
  }

  $("#btn-prompt")[0].onclick=function(){
    var win = new w.Window();
    win.prompt({
      width:500,

      title:"第一个弹窗",
      content:"你好漂亮",
      text4alertBtn:"OK",
      
      isCloseBtn:true,
      skinClassName:null,
      isMask:true,
      isDraggable:true,
      dragHandle:".window-boundingBox"
    });
    win.on("confirm",function(){
      console.log("confirm event");
    }).on("close",function(){
      console.log("close is closed")
    }).on("cancel",function(){
      console.log("cancel event")
    });
  } 
  
});
