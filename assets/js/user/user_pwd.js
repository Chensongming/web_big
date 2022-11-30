$(function(){
    var from=layui.form
    var layer=layui.layer
    from.verify({
        pwd:[/^[\S]{6,12}$/,'密码6到12位且不能有空格'],
        samepwd:function(value){
            if(value===$('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
        newpwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '修改密码不一致'
            }
        }
       

    })
    $('.layui-form').on('submit',function(e){
            e.preventDefault();
            $.ajax({
                method:'POST',
                url:'/my/updatepwd',
                data:$(this).serialize(),
                success:function(res){
                //    console.log(res)
                if(res.status!==0)
                {
                    return layer.msg('erro')
                }
                layer.msg('成功')
                $('.layui-form')[0].reset()
                }
                
            })
    })
})