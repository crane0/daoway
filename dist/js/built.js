$(function () {
  //导航栏动画
  var $header = $('.header-container');
  $(window).scroll(function () {
    if($(this).scrollTop()>70){
      $header.addClass('on');
    }else {
      $header.removeClass('on');
    }
  })

  //轮播图参数
  $('.slideTxtBox').slide({
    effect: "fold",   //覆盖效果
    autoPlay: true,
    // trigger: "click"
  });

  //导航栏，点击变色
  let $lis = $('.select li')
  for(let i = 0; i < $lis.length; i++){
    //这种绑定事件的方式是jQuery的，所以要包装被jQuery对象
    $($lis[i]).on('click', function () {
      for(let i = 0; i < $lis.length; i++){
        $lis[i].className = ''
      }
      this.className = 'active'
    })
  }


  //发送请求，获取首页的数据
  $.getJSON('http://localhost:3000/getIndex', function (data) {
    console.log(data)
    var html = template("box",data);
    $('.box-container').html(template('box', {data: data}))
  })
})

