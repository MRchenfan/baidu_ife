define(['widget'],function(widget){
  function Table(){
    this.config = {
      caption:"表格",
      data:[
            {
              "name":"a",
              "chinese":90,
              "math":89,
              "english":88,
              "total":2001
            },
            {
              "name":"b",
              "chinese":93,
              "math":67,
              "english":88,
              "total":2002
            },
            {
              "name":"c",
              "chinese":90,
              "math":89,
              "english":88,
              "total":2003
            },
            {
              "name":"d",
              "chinese":90,
              "math":89,
              "english":88,
              "total":2004
            }
          ],
      isSort:true,

    }
    this.sm = true;
    this.sortPro = "";
    widget.Widget.call(this);//继承两个属性
  }

  $.extend(true, Table.prototype, new widget.Widget());
  

  Table.prototype.renderUI = function(){
    //生成表格
    this.boundingBox = $("#table-boundingBox")[0];
    this.boundingBox.innerHTML = 
      "<caption>" + this.config.caption + "</caption>" +
      "<thead id='table-boundingBox-thead'>" +
      "</thead>" +
      "<tbody id='table-boundingBox-tbody'>" +
      "</tbody>";
    //插入表头
    var thead = $("#table-boundingBox-thead")[0];
    var tbody = $("#table-boundingBox-tbody")[0];

    var theads = [];
    for(var key in this.config.data[0]){
      theads.push(key);
    }

    var hStr = "<tr>";
    if(this.config.isSort){

      theads.forEach(function(item,index){

        hStr += "<th>" + item + "<em class='top'></em><em class='bottom'></em></th>";
      });
    }else{
      theads.forEach(function(item,index){

        hStr += "<th>" + item + "</th>";
      });
    }
    thead.innerHTML = hStr+"</tr>";

    //插入数据
    this.config.data.forEach(function(item,index){
      var bStr = "<tr>";
      for(var p in item){
        bStr += "<td>" + item[p] + "</td>";
      }
      tbody.innerHTML += bStr + "</tr>";
    });
  };
  Table.prototype.bindUI = function(){
    if(this.config.isSort){
      var _this_ = this;

      var thead = $("#table-boundingBox-thead");
      thead.on("click",function(event){

        var target = event.target;

        var pro = target.innerHTML.substring(0,2);

        //对data排序
        _this_.sm = _this_.sm?false:true;
        _this_.sortPro = pro;

        _this_.config.data.sort(sortMethod(pro,_this_.sm));  
        //重新渲染
        _this_.renderUI();
        _this_.bindUI();
      });
    }
    
  };
  Table.prototype.syncUI = function(arrow){};
  Table.prototype.destructor = function(){};
  Table.prototype.init = function(config){
    for(var p in config){
      this.config[p] = config[p];
    }
    this.handlers = {};
    this.render();
    return this;
  }


  function sortMethod(pro,bool){
    return function(a,b){
      if(bool){
        return a[pro] - b[pro];
      }else{
        return b[pro] - a[pro];
      }  
    }
  }
  return {Table:Table};
});