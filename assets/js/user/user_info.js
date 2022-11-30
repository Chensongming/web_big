$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '不能大于6个字符'
            }
        }
    })
// 获取用户的基本信息
initUserInfo();
// 重置表单
$('#btnReset').on('click',function(e){
    e.preventDefault()
    // console.log('s')
    initUserInfo();
})
$('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        method:'POST',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg(res.message)
            window.parent.getUserInfo()

        }
    })
})
})
function initUserInfo(){
    var form=layui.form
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                return layer.msg('获取用户信息失败')
            }
            layer.msg('获取用户的基本信息成功')
            form.val('formUserInfo',res.data)
        }
    })
}