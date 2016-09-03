/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  //初始化，清空并且更新数据
  initAqiChartData();
  var chart_box=document.getElementById("aqi-chart-wrap"); 
  chart_box.innerHTML=null;
  //1 取得数值  chartData[city][gra]
  for(var city in chartData){
    for(var gra in chartData[city]){
      var gra_box=document.createElement("div");
      gra_box.style.cssText="vertical-align:bottom;display:inline-block;margin-left:3px;box-sizing:border-box;";
      gra_box.style.height=chartData[city][gra]+"px";
      //宽度区别
      var wid=0;
      switch(pageState.nowGraTime){
        case "day":wid=5;break;
        case "week":wid=10;break;
        case "month":wid=20;break;
      }
      gra_box.style.width=wid+"px"
      // 颜色区别
      var color_value=[];
      color_value[0]=Math.round(chartData[city][gra]/100*10);
      color_value[1]=Math.round(chartData[city][gra]/10%10*10);
      color_value[2]=Math.round(chartData[city][gra]%10*10);
      // console.log(Math.round(chartData[city][gra]/100*10))
      // console.log(Math.round(chartData[city][gra]/10%10*10))
      // console.log(Math.round(chartData[city][gra]%10*10))
      gra_box.style.background="rgb("+color_value[0]+","+color_value[1]+","
      +color_value[2]+")";
      //定义title属性
      gra_box.title="日期："+gra+"\n 空气质量："+chartData[city][gra];
      //插入节点
      chart_box.appendChild(gra_box);
      //定义id，后续修饰用
      gra_box.className="char-gra";   
      gra_box.innerHTML=chartData[city][gra];
      gra_box.style.fontSize="10px"
      gra_box.style.color="red"
    }
  };
  //2 
  displayAnimate();
}
//修饰显示
function displayAnimate(){
  var char_gra=document.getElementsByClassName("char-gra");

}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var radios=document.getElementsByName("gra-time");
  for(var i=0;i<radios.length;i++){
    if(radios[i].checked){
      if(radios[i].value==pageState.nowGraTime){
        return;
      }else{
        // 设置对应数据
        pageState.nowGraTime=radios[i].value;
      }
    }
  }
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var city_select=document.getElementById("city-select");
  if(pageState.nowSelectCity==city_select.selectedIndex){
    return;
  }else{
    pageState.nowSelectCity=city_select.selectedIndex;
  }
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  //1 获取radio radio的事件有：onclick,onfocus,onblur
  var radios=document.getElementsByName("gra-time");
  for(var i=0;i<radios.length;i++ ){
    radios[i].addEventListener("click",graTimeChange,false);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city_select=document.getElementById("city-select");
  for(var city in aqiSourceData){
    var city_option=document.createElement("option");
    city_option.innerHTML=city;
    city_select.appendChild(city_option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city_select.addEventListener("click",citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  //1 获取当前城市
  chartData={};
  var citys=[];
  for(var city_name in aqiSourceData){
    citys.push(city_name);
  }
  var city=citys[pageState.nowSelectCity];
  //2 根据粒度选择处理数据
  switch(pageState.nowGraTime){
    case "day":
      chartData[city]=aqiSourceData[city];
      break;
    case "week":
      chartData[city]=newData(7,city);
      break;
    case "month":
      chartData[city]=newData(30,city);
      break;
  }
  //3 渲染
  // renderChart();
}
/*
*  date:
*  author:
*  note:
*    1.数据处理对字符串没有整理好
*    2.对多余天数没有处理
*    3.
*    4.
*/
function newData(num,city){
      var value=[];
      for(var date in aqiSourceData[city]){
        value.push(aqiSourceData[city][date]);
      }
      //
      var temp=0;
      var count=0;
      var new_value=[];
      for(var i=0;i<value.length;i++){
        temp+=value[i];
        count++;
        if(count==num){
          new_value.push(Math.round(temp/num));
          temp=0;
          count=0;
        }
      }
      //对多余天数的处理
      var remain_days=value.length%num;
      temp=0;
      for(var i=(value.length-remain_days);i<value.length;i++){
        temp+=value[i];
      }
      if(remain_days){
        new_value.push(Math.round(temp/remain_days));
      }
      //创建一个新的对象
      var new_data={};
      for(var i=0;i<new_value.length;i++){
        var str;
        str=((num==7)?"周":"月");
        str="第"+(i+1)+str;
        new_data[str]=new_value[i];
      }
      return new_data;
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();