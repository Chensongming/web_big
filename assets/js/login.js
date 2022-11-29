$(function(){
  var username='';
  var password='';
  // 注册页与登录页之间的切换开始
  $('#link_reg').on('click',function(e){
    e.preventDefault();
    $('.login-box').hide();
    $('.reg-box').show();
  })
  $('#link_login').on('click',function(e){
    e.preventDefault();
    $('.login-box').show();
    $('.reg-box').hide();
  })
  // 注册页与登录页之间的切换结束

  // 验证开始
  var form=layui.form;
  var layer=layui.layer;
  form.verify({
    pwd:[/^[\S]{6,12}$/,
    '密码必须6到12位，且不能出现空格'
  ],
  repwd:function(value){
    var pwd=$('.reg-box input[name=password]').val();
    // console.log(pwd);
    // console.log(value);
    if(pwd!=value){
      return '两次的密码不一致'
    }
  }
  })

  //注册
  $('#form_reg').on('submit',function(e){
    e.preventDefault();
    var data={
      username:$('#form_reg input[name=username]').val(),
      password:$('#form_reg input[name=password]').val()
    }
    $.post('/api/reguser',data,function(res){
      if(res.status!==0){
        return layer.msg(res.message);
      }
      layer.msg('注册成功');
      $('#link_login').click();
      $('#form_login input[name=username]').prop('value',data.username);
      $('#form_login input[name=password]').prop('value',data.password);
      
    })
  })

  //登录
  $('#form_login').submit(function(e){
    e.preventDefault();
    $.ajax({
      url:"/api/login",
      method:'POST',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg(res.message);
        }
        layer.msg('登录成功');
        // console.log(res);
        localStorage.setItem('token',res.token)
        location.href='/index.html';
      }
    })
  })
})