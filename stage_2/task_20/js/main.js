$=function(el){
	return document.querySelector(el);
}

var arrData=[];

$("#insert-btn").onclick=function(){
	var str=$("#txt").value.trim();
	var arrWord = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
            if (e != null && e.length > 0) {
                return true;
            } else {
                return false;
            }
        });
	arrData=arrData.concat(arrWord);
	render();
}

$("#search-btn").onclick=function(){
	var str=$("#search-txt").value.trim();
	render(str);
}

function render(str){
	$("#show-box").innerHTML=arrData.map(function(item){
		if(str&&str.length>0){
			item=item.replace(new RegExp(str,"g"),"<strong>"+str+"</strong>");
		}
		return "<span>"+item+"</span>";
	}).join(" ");
}