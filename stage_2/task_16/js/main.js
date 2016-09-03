/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city_input=document.getElementById("aqi-city-input").value.trim();
    var value_input=document.getElementById("aqi-value-input").value.trim();
    //处理输入的数据
    if(!city_input.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!value_input.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }

  aqiData[city_input]=value_input;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table=document.getElementById("aqi-table"); 
  //重写表格
  var items="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  for(var city in aqiData){
    items+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td></tr>";
  }
  table.innerHTML=city?items:"";//没有作用域，for中的参数可以在作用链里面找到
  //给新增的按钮添加事件
  /*var delete_btns=table.getElementsByTagName("button");
    for(var i=0;i<delete_btns.length;i++){
        delete_btns[i].onclick=delBtnHandle;
    }*/
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(del_button) {
  // do sth.
  var city=del_button.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
  delete aqiData[city];
  renderAqiList();
}

function init() {
   var table=document.getElementById("aqi-table");
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var add_btn=document.getElementById("add-btn");
  add_btn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  table.addEventListener("click",function(event){
    if(event.target.nodeName.toLowerCase()=="button"){
      // delBtnHandle(event.parentNode.parentNode.);
      delBtnHandle(event.target);

    }
  })
 /* var delete_btns=table.getElementsByTagName("button");
    for(var i=0;i<delete_btns.length;i++){
      delete_btns[i].onclick=delBtnHandle;
    }*/
  //问题：添加一行后事件没有绑定
}

window.onload=init;