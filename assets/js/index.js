$(function(){
    var layer=layui.layer;
   getUserInfo();

//    退出登录
   $('#btnlogout').on('click',function(){
    layer.confirm('确定退出登录', {icon:3,title:'提示'},function(index){
        localStorage.removeItem('token');
        location.href='/login.html';
        layer.close(index)
      })
   })
})

// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ""
        // },
        success:function(res){
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            renderAvatar(res.data);
        },
       
    })
}
function renderAvatar(user){
    var name=user.nickname || user.username;
    $('.userinfo #welcom').html('欢迎&nbsp;&nbsp;'+name);
    if(user.user_pic!==null){
        $('.layui-nav-img').prop('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }
}