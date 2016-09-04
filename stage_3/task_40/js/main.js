require.config({
  paths:{
    widget:'widget'
  }
});
require(['calender'],function(Calender){

  /*
  * api
  * 1. choosed 事件，参数date（Date对象）
  *
  */
  new Calender().init({
    container:$('.calender-picker')
  }).on('choosed',function(date){

    console.log(date);
    $('#date')[0].value = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    
  });
  
  var isShow = false;
  $('#date').on('click',function(event){

    event.stopPropagation();

    if(isShow){
      $('.calender-picker .calender-box').hide();
      isShow = false;
    }else{
      $('.calender-picker .calender-box').show();
      isShow = true;
    }

  });

  $(window).on('click',function(){

    if(isShow){
      $('.calender-picker .calender-box').hide();
      isShow = false;
    }
  });

  new Calender().init({

    container:$('.calender-2')
    
  })
});
