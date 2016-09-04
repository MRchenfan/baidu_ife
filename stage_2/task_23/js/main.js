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

window.onload=function(){
  var timer=null;
  var targetNode=[];
  /*function Position(name,depth){
    this.name=name;
    this.depth=depth;
  }
  */
  //每个节点都有一个唯一的id值
  var tree=new Tree(["CEO",0]);
  tree.add(["CTO",1],"CEO");
  tree.add(["COO",2],"CEO");
  tree.add(["产品部经理",3],"COO");
  tree.add(["行政部经理",4],"COO");
  tree.add(["顾问团",5],"CTO");
  tree.add(["前端设计经理",6],"CTO");
  tree.add(["行政部经理",7],"COO");
  tree.add(["人力资源部经理",8],"COO");
  tree.add(["js",9],"前端设计经理");
  tree.add(["css",10],"前端设计经理");
  tree.add(["html",11],"前端设计经理");

  console.log(tree);

  createDOM();

  //df traverse event
  $("form")["btn-df"].onclick=function(){
    if(timer){return false;}//check timer
    searchDF();
  }
  //bf traverse event
  $("form")["btn-bf"].onclick=function(){
    if(timer){return false;}
    searchBF();
  }
  //search event
  $("form")["btn-search"].onclick=function(){
    if(timer){return false;}
    var matchStr=$("form")["input-search"].value.trim();
    //validator
    if(matchStr==""){
      alert("please input something");
      return false;
    }

    if($("form").method.value=="method-df"){
      searchDF(matchStr);
    }else if($("form").method.value=="method-bf"){
      searchBF(matchStr);
    }
  }
  //choose and delete
  $(".container").onclick=function(e){
    var e=e||window.event;
    //prevent 
    if(e.stopPropagation){
       e.stopPropagation();
     }else{
       e.cancelBubble=true;
     }
    targetNode.pop();//只选择一个节点
    targetNode.push(e.target||e.srcElement);
    highLight();
  }
  window.onclick=function(){
    targetNode=[];
    highLight();
  }
  // 删除选中
  $("form")["btn-delete"].onclick=function(){
    if(targetNode.length>0){
      // targetNode.forEach(function(item){
      //   deleteNodes(item);
      // });
      //只删除一个
      deleteNodes(targetNode.pop());
    }
  }
  $("form")["new-node"].onclick=function(e){
    var e=e||window.event;
    if(e.stopPropagation){
       e.stopPropagation();
     }else{
       e.cancelBubble=true;
    }
  }

  $("form")["btn-new"].onclick=function(){
    var str=$("form")["new-node"].value.trim();
    if(targetNode.length==0){return false;}
    if(str.length>0){
      //new id
      var id=0;
      var ids=[];
      tree.traverseBF(function(node){
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

      tree.add([str,id],targetNode[0].firstChild.nodeValue);
      
      console.log(id);

      createDOM();
    }else{
      alert("please input something !")
    }
  }

  //函数区
  function deleteNodes(node){
    tree.deleteAll(node.firstChild.nodeValue);
    createDOM();
  }
  function highLight(){
    //init
    var nodes=[];
    tree.traverseDF(function(node){
      nodes.push(node);
    });
    for(var j=0;j<nodes.length;j++){
      $(".box-"+nodes[j].data[1]).style.background="#fff";
    }
    //high light
    targetNode.forEach(function(item){
      item.style.background="#EA96DC";
    });
  }

  function searchBF(matchStr){
    var nodes=[];
    tree.traverseBF(function(node){
      nodes.push(node);
    });
    render(nodes,matchStr);
  }
  function searchDF(matchStr){
    var nodes=[];
    tree.traverseDF(function(node){
      nodes.push(node);
    });
    render(nodes,matchStr);
  }

  function render(nodes,matchStr){
    var result=false;
    var i=0;
    timer=setInterval(function(){
      //init
      for(var j=0;j<nodes.length;j++){
        $(".box-"+nodes[j].data[1]).style.background="#fff";
      }
      //render target
      $(".box-"+nodes[i].data[1]).style.background="#B056EF";

      i++;    

      //check search
      if(nodes[i-1].data[0]==matchStr){
        result=true;//when found
        $(".box-"+nodes[i-1].data[1]).style.background="#B0F6B6";
        clearInterval(timer);
        timer=false;
      }
      //end
      if(!result){
        if(i==nodes.length){
          clearInterval(timer);
          timer=false;
          setTimeout(function(){
            $(".box-"+nodes[i-1].data[1]).style.background="#fff";
          },500);
        } 
      }
    },500);
  }

  function createDOM(){
    tree.traverseBF(function(node){
      if(node.parent){
        $(".box-"+node.parent.data[1]).innerHTML+="<div class='box-"+node.data[1]+"'>"+node.data[0]+"</div>";
      }else{
        $(".container").innerHTML="<div class='box-"+node.data[1]+"'>"+node.data[0]+"</div>"
      }
    });
  }
}
  
function $(el){
  return document.querySelector(el);
}