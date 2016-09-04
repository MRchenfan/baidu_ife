function TreeToolkit(treeContainer){
  var _this=this;
  this.container=treeContainer;

  //多叉树定义
  function Node(data){
    this.data=data;
    this.parent=null;
    this.children=[];
  }
  function Tree(data){
    this.root=new Node(data);
  }
  Tree.prototype={
    traverseDF:function(callback){
      (function helper(node){
        if(node!=null){
          for(var i=0;i<node.children.length;i++){
            helper(node.children[i]);
          }
          callback(node);
        }
      })(this.root);
    },
    traverseBF:function(callback){
      var cache=[];
      var currentNode=this.root;
      while(currentNode){
        for(var i=0;i<currentNode.children.length;i++){
          cache.push(currentNode.children[i]);
        }
        callback(currentNode);
        currentNode=cache.shift();
      }
    },
    add:function(data,parent){
      var n=new Node(data);
      var flag=true;
      var parentNode=null;
      this.traverseBF(function(node){
        //去重
        if(node.data[0]==data[0]){
          flag=false;
        }

        if(node.data[0]==parent){
          parentNode=node;
        }
      });

      if(flag){
        parentNode.children.push(n);
      n.parent=parentNode;
      }

    },
    deleteAll:function(value){
      this.traverseBF(function(node){
        if(node.data[0]===value){
          //找到要删除的节点后
          if(node.parent){
            node.parent.children.forEach(function(item,index){
              if(item.data[0]===value){
                node.parent.children.splice(index,1);
              }
            });
          }else{
            alert("cant delete root");//当parent不存在时
          }
        }
      });
      return false;
    },
    toString:function(){
      var str="tree: ";
      this.traverseBF(function(node){
        str+=node.data+" ;  ";
      });
      return str;
    }
  }  
  //生成数据结构
  this.tree=new Tree(["CEO",0]);
  this.tree.add(["CTO",1],"CEO");
  this.tree.add(["COO",2],"CEO");
  this.tree.add(["产品部经理",3],"COO");
  this.tree.add(["行政部经理",4],"COO");
  this.tree.add(["顾问团",5],"CTO");
  this.tree.add(["前端设计经理",6],"CTO");
  this.tree.add(["行政部经理",7],"COO");
  this.tree.add(["人力资源部经理",8],"COO");
  this.tree.add(["js",9],"前端设计经理");
  this.tree.add(["css",10],"前端设计经理");
  this.tree.add(["html",11],"前端设计经理");

  //1.生成dom
  this.createDom();

  // 2.实现新增和删除
  // 在createDom中绑定事件

  // 3.实现展开和闭合
  // 在createDom中绑定事件

  // 4.实现搜索和高亮
  document.forms[0]["btn-search"].onclick=function(){
    var searchTxt=document.forms[0]["input-search"].value.trim();
    //validate
    if(searchTxt==""){return false;}

    _this.tree.traverseBF(function(node){

      if(node.data[0]==searchTxt){
        //找到后渲染
        _this.renderFound(node);

      }

    });
  }
  // 5.实现清除搜索框和高亮
  document.forms[0]["btn-clear"].onclick=function(){
    //clear input value
    document.forms[0]["input-search"].value="";

    //clear highlight
    _this.createDom();
  }

}
TreeToolkit.prototype={
  renderFound:function(node){
    
    var targetTextNode=$(".box-"+node.data[1])[0].getElementsByTagName("span")[0];
    
    targetTextNode.innerHTML="<strong style='color:red;'>"+targetTextNode.innerHTML+"</strong>";
  },
  // 增加节点
  addNode:function(node){
    var parent=node.parentNode.getElementsByTagName("span")[0].innerHTML;
    var data=window.prompt("请输入需要插入的名称：");

    //validate 
    if(data==""){
      return false;
    }

    var id=this.newId();
    this.tree.add([data,id],parent);
  },
  // 生成新的id
  newId:function(){
    var id=0;
    var ids=[];
    this.tree.traverseBF(function(node){
      ids.push(node.data[1]);
    });

    ids.sort(function(a,b){
      return a-b;
    });

    ids.forEach(function(item){
      if(item==id){
        id++;
      }
    });

    return id;
  },
  // 删除节点
  removeNode:function(node){
    this.tree.deleteAll(node.parentNode.getElementsByTagName("span")[0].innerHTML);
  },
  //生成dom结构并绑定新增和删除事件
  createDom:function(){
    var _this=this;
    /*this.tree.traverseBF(function(node){
      if(node.parent){
        $(".box-"+node.parent.data[1])[0].innerHTML+="<div class='box-"+node.data[1]+"'>"+
        "<p><em class='tree-arrow'></em>"+node.data[0]+"<input type='button' onclick='alert(_this);' value='add'/><input type='button' onclick='_this.removeNode(this);' value='remove' /></p></div>";
      }else{
        _this.container.innerHTML="<div class='box-"+node.data[1]+"'>"+
        "<p><em class='tree-arrow'></em>"+node.data[0]+"<input type='button' onclick='alert(_this);' value='add'/></p></div>"
      }*/

      this.tree.traverseBF(function(node){
      if(node.parent){
        $(".box-"+node.parent.data[1])[0].innerHTML+="<div class='box-"+node.data[1]+"'>"+
        "<p><em class='tree-arrow'></em><span>"+node.data[0]+"</span><input class='btn-add' type='button' value='add'/><input class='btn-remove' type='button' value='remove' /></p></div>";
      }else{
        _this.container.innerHTML="<div class='box-"+node.data[1]+"'>"+
        "<p><em class='tree-arrow'></em><span>"+node.data[0]+"</span><input class='btn-add' type='button' value='add'/></p></div>"
      }
    });

    // 绑定新增和删除事件
    var btnsAdd=$(".btn-add");
    var btnsRemove=$(".btn-remove");

    for(var i=0;i<btnsAdd.length;i++){
      btnsAdd[i].onclick=function(){
        _this.addNode(this);
        _this.createDom();
      }
    };
    for(var i=0;i<btnsRemove.length;i++){
      btnsRemove[i].onclick=function(){
        _this.removeNode(this);
        _this.createDom();
      }
    };
    // 绑定展开和闭合事件
    var heads=this.container.getElementsByTagName("span");
    for(var i=0;i<heads.length;i++){
      heads[i].onclick=function(){
          
        var divs=_this.getChildDivs(this.parentNode.parentNode);

        //如果没有就返回
        if(divs.length==0){return false;}

        // 切换状态
        if(divs[0].style.display=="none"){
          for(var i=0;i<divs.length;i++){
            divs[i].style.display="block";
          }
        }else{
          for(var i=0;i<divs.length;i++){
            divs[i].style.display="none";
          }
        }
        
      }
    }
  },
  getChildDivs:function(currentNode){
    var divs=[]
    for(var i=0;i<currentNode.childNodes.length;i++){
      if(currentNode.childNodes[i].nodeName.toLowerCase()=="div"){
        divs.push(currentNode.childNodes[i]);
      }
    }
    return divs;
  }
}

TreeToolkit.init=function(trees){
  var _this=this;
  for(var i=0;i<trees.length;i++){
    new _this(trees[i]);
  }
}


