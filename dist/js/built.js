$(function () {
  $('.slideTxtBox').slide();
  let $uls = $('.select')
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



  // $d1.on('click',function () {
  //   console.log(32)
  //   $.getJSON('http://localhost:3000/getComment', function (data) {
  //     console.log(data)
  //   })
  // })
})