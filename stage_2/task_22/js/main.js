
//找到根节点
var treeRoot=$("#tree-root");
//保存三种方式得到的节点顺序
var treeData={
  divList_1:[],
  divList_2:[],
  divList_3:[]
}
//前序遍历
function preOrder(node) {
  if (!(node == null)) {
    treeData.divList_1.push(node);
    preOrder(node.firstElementChild);
    preOrder(node.lastElementChild);
  }
}
//中序遍历
function inOrder(node) {
  if (!(node == null)) {
    inOrder(node.firstElementChild);
    treeData.divList_2.push(node);
    inOrder(node.lastElementChild);
  }
}

//后序遍历
function postOrder(node) {
  if (!(node == null)) {
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    treeData.divList_3.push(node);
  }
}

//绑定按钮事件
eventUtil.addEvent($("#btns"),"click",function(e){
  e=eventUtil.getEvent(e);
  //获得事件当前对象
  var target= eventUtil.getTarget(e);
  //分别绑定事件
  if(target.name=="pre-btn"){
    if(treeData.divList_1.length==0){
      preOrder(treeRoot);
    }
    render(treeData.divList_1);
  }else if(target.name=="in-btn"){
    if(treeData.divList_2.length==0){
      inOrder(treeRoot);
    }
    render(treeData.divList_2);
  }else if(target.name=="post-btn"){
    if(treeData.divList_3.length==0){
      postOrder(treeRoot);
    }
    render(treeData.divList_3);
  }
})
//
//init让所有的背景都成白色
function init(){
  treeRoot.style.background="#fff";
  var childs=treeRoot.getElementsByTagName("div");
  for(var i=0,l=childs.length;i<l;i++){
    childs[i].style.background="#fff";
  } 
}
var timer=null;
function render(divList){
  clearInterval(timer);
  init(); 
  //逐个渲染
  var index=0;
  divList[index].style.background="#5707CD";
  timer=setInterval(function(){
    //判断结束标志
    if(index==divList.length){
      clearInterval(timer);
      init();
    }else{
      divList[index].style.background="#5707CD";
    }
    //前一个重设为白色
    if(index>0){
      divList[index-1].style.background="#fff";
    }
    index++;
  },300);
}
/*
*  date:
*  author:
*  note:
*    1.有两个bug调试好了，一个是定时器结束判断；一个是多次执行只需第一次载入数据
*/
