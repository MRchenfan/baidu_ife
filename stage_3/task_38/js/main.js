require.config({
  paths:{
  }
});

require(["table"],function(t){
  /*
  * 数据类型应该是对象数组
  */
  data = [
    {
      "name":"Tom",
      "chinese":90,
      "math":89,
      "english":88
    },
    {
      "name":"Tom",
      "chinese":90,
      "math":89,
      "english":88
    },
    {
      "name":"Tom",
      "chinese":90,
      "math":89,
      "english":88
    }
  ];

  new t.Table().init({
    caption:"我是表格",
    data:[
            {
              "姓名":"小明",
              "语文":80,
              "数学":90,
              "英语":70,
              "总分":240
            },
            {
              "姓名":"小红",
              "语文":90,
              "数学":60,
              "英语":90,
              "总分":240
            },
            {
              "姓名":"小亮",
              "语文":60,
              "数学":100,
              "英语":70,
              "总分":230
            },  
            {
              "姓名":"大头",
              "语文":90,
              "数学":50,
              "英语":40,
              "总分":180
            },       
          ],

    isSort:true     
  });
});