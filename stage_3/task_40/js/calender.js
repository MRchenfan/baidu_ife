define(['widget'],function(widget){

  function Calender(){

    this.version = '日历组件 2016.8.26';
    this.choosed = new Date();

    this.config = {

    };

  }

  $.extend(true, Calender.prototype, new widget.Widget());
  
  /*
  * 传入一个Date对象，可以渲染出当月的日历
  * 这个方法是核心方法！！
  */
  Calender.prototype.renderUI = function(p_date){

    var p_date = p_date?p_date:new Date();

    this.boundingBox = this.config.container.find('.calender-box');
    var date_box = this.boundingBox.find('tbody');

    // 生成本月的日期
    var month = p_date.getMonth();
    var year = p_date.getFullYear();
    var date = p_date.getDate();

    // 
    this.boundingBox.find('.calender-header-text').html(year +'年'+ (month+1) +'月')
                                                  .attr({
                                                    'data-year': year,
                                                    'data-month': month
                                                  });
  
    // 
    var start = new Date(year,month,1);
    var before = (start.getDay()==7)? 0: start.getDay();
    start = new Date(start.getTime() - before*1000*3600*24);

    var end = new Date(year,month+1,0);

    var outer = '';
    do{

      var inner = '<tr>';
      for(var i=0;i<7;i++){

        inner += '<td class="calender-date-' + (i+1) + 
                  '"data-date=' + start.getTime() + 
                  '>' + start.getDate() +
                  '</td>';

        start = new Date(start.getTime() + 1000*3600*24);
      }
      outer += inner + '</tr>';

    }while(start.getTime() < end.getTime());

    date_box.html(outer);
  }

  Calender.prototype.bindUI = function(){

    var _this_ = this;

    // 选中日期，触发choosed事件，并且刷新日历
    _this_.boundingBox.delegate('td', 'click', function(event) {

      var date = new Date(parseInt($(this).attr('data-date')));

      _this_.fire('choosed',date);// 释放choosed事件,并且传递一个date对象

      _this_.choosed = date;

      _this_.renderUI(date);

      _this_.syncUI();

    });
    // 头部按钮
    $('.calender-header-btn-prev').on('click',function(){
      
      
      var year = _this_.boundingBox.find('.calender-header-text').attr('data-year');

      var month = _this_.boundingBox.find('.calender-header-text').attr('data-month');

      if(month == 0){

        month = 11;

        year--;

      }else{

        month--;

      }

      _this_.renderUI(new Date(year,month,1));
      _this_.syncUI();

    });
    $('.calender-header-btn-next').on('click',function(){

      var year = _this_.boundingBox.find('.calender-header-text').attr('data-year');

      var month = _this_.boundingBox.find('.calender-header-text').attr('data-month');

      if(month == 11){

        month = 0;

        year++;

      }else{

        month++;

      }

      _this_.renderUI(new Date(year,month,1));
      _this_.syncUI();

    });
  }
  Calender.prototype.syncUI = function(){
    var _this_ = this;

    var rows = this.boundingBox.find('tbody>tr');

    $(rows.first()).find('td').each(function(index, el) {

      var date = new Date(parseInt($(el).attr('data-date'))).getDate();
      if(date>10){
        $(this).css({
          color:'#999'
        });
      }
    });

    $(rows.last()).find('td').each(function(index, el) {

      var date = new Date(parseInt($(el).attr('data-date'))).getDate();
      if(date<10){
        $(this).css({
          color:'#999'
        });
      }
    });

    this.boundingBox.find('td').each(function(index, el) {
     
      if(new Date(parseInt($(el).attr('data-date'))).getFullYear() == _this_.choosed.getFullYear() &&
      new Date(parseInt($(el).attr('data-date'))).getMonth() == _this_.choosed.getMonth() &&
      new Date(parseInt($(el).attr('data-date'))).getDate() == _this_.choosed.getDate()){
        
        $(el).css({
          background: '#313038',
          color: '#eee'
        });
      }
    });

  }
  Calender.prototype.destructor = function(){}

  Calender.prototype.init = function(config){
    $.extend(this.config, config);
    this.handlers={};
    this.render();
    return this;
  }

  return Calender;
});