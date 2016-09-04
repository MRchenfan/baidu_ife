$=function(el){
	return document.querySelector(el);
}
//tag data
var arrData=[];
$("#tag").onkeyup=function(e){
	e=e?e:window.event;
	//怎么检测到符号和空格，非字符
	// /[^0-9a-zA-Z\u4e00-\u9fa5]+/
	if(/[^0-9a-zA-Z\u4e00-\u9fa5]/.test(String.fromCharCode(e.keyCode))){
		var str=$("#tag").value.trim();
		if(str&&str.length>0){
			arrData.push(str);
			$("#tag").value=null;
			//渲染前处理数据
			arrData=arrData.unique();
			arrData=checkData(arrData);
			render($("#tag-box"),arrData);
		}
	}
}
//textarea data
var txtData=[];
$("#txt-btn").onclick=function(e){
	var str=$("#textarea").value.trim();
	var arrWord=str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){
		if(item&&item.length>0){
			return true;
		}else{
			return false;
		};
	});
	txtData=txtData.concat(arrWord);
	// 渲染前处理数据
	txtData=txtData.unique();
	txtData=checkData(txtData);
	render($("#hobby-box"),txtData);
}
//渲染
function render(box,data){
	//渲染
	box.innerHTML=data.map(function(item){
		return "<span>"+item+"</span>";
	}).join(" ");
}
//保留后十个 三种方法：
/*function checkData(data){
	//最多十个
	if(data.length>10){
		//保留后十个
		data.shift();
		if(data.length==10){
			return data;
		}else{
			return checkData(data);
		};
	}else{
		return data;
	}
}*/
/*function checkData(data){
	if(data.length>10){
		//保留后十个
		data=data.reverse();
		data.length=10;
		return data.reverse();
	}else{
		return data;
	}
}*/
function checkData(data){
	while(data.length>10){
		data.shift();
	}
	return data;
}
//在数组原型中添加去重方法
Array.prototype.unique= function(){
 var res = [];
 var json = {};
 for(var i = 0; i < this.length; i++){
  if(!json[this[i]]){
   res.push(this[i]);
   json[this[i]] = 1;
  }
 }
 return res;
}

$("#tag-box").addEventListener("mouseover",function(e){
	e=e?e:window.event;
	var target=e.target||e.srcElement;
	if(target.nodeName.toLowerCase()=="span"){
		target.style.background="#6E51F1";
		target.innerHTML="点击删除";
	}
},false);
//添加事件监听，修改tags
$("#tag-box").addEventListener("mouseout",function(e){
	e=e?e:window.event;
	var target=e.target||e.srcElement;
	if(target.nodeName.toLowerCase()=="span"){
		target.style.background=" ";
		render($("#tag-box"),arrData);
	}
},false);

$("#tag-box").addEventListener("click",function(e){
	e=e?e:window.event;
	var target=e.target||e.srcElement;
	if(target.nodeName.toLowerCase()=="span"){
		//获取下标
		var tags=this.getElementsByTagName("span");
		var flag=null;
		for(var i=0;i<tags.length;i++){
			if(tags[i]==target){
				flag=i;
			}
		}
		//处理数据和重新渲染
		arrData.splice(flag,1);
		render($("#tag-box"),arrData);
	}
},false);
// 添加事件监听，修改hobby
$("#hobby-box").addEventListener("mouseover",function(e){
	e=e?e:window.event;
	var target=e.target||e.srcElement;
	if(target.nodeName.toLowerCase()=="span"){
		target.style.background="#6E51F1";
		target.innerHTML="点击删除";
	}
},false);

$("#hobby-box").addEventListener("mouseout",function(e){
	e=e?e:window.event;
	var target=e.target||e.srcElement;
	if(target.nodeName.toLowerCase()=="span"){
		target.style.background=" ";
		render($("#hobby-box"),txtData);
	}
},false);

$("#hobby-box").addEventListener("click",function(e){
	e=e?e:window.event;
	var target=e.target||e.srcElement;
	if(target.nodeName.toLowerCase()=="span"){
		//获取下标
		var tags=this.getElementsByTagName("span");
		var flag=null;
		for(var i=0;i<tags.length;i++){
			if(tags[i]==target){
				flag=i;
			}
		}
		//处理数据和重新渲染
		txtData.splice(flag,1);
		render($("#hobby-box"),txtData);
	}
},false);
