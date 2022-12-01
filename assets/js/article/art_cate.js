$(function(){
    getArticleInfo()
    function getArticleInfo(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                // console.log(res);
                if(res.status!==0){
                    return layui.layer.msg('获取文章类别失败！')
                }
                layui.layer.msg('获取文章类别成功！')
                var article_data=template('article_list',res)
                $('tbody').html(article_data)
            }
        })
    }
    // 添加文章的类别
    var indexAdd=null;
    $('#addArticle').on('click',function(){
        // console.log($('#addArticle_add').html())
        indexAdd=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章类别'
            ,content: $('#addArticle_add').html()
          });  
    })

    $('body').on('submit','#add_acte',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg('添加分类失败')
                }
                layui.layer.msg('添加分类成功')
                getArticleInfo();
                layer.close(indexAdd)
            }
        })
       
    })
    
    // 编辑
    var indexEdit=null;
    $('body').on('click','#article_edit',function(e){
        indexEdit=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '编辑文章类别'
            ,content: $('#editArticle_edit').html()
          })

           // 根据id获取文章分类
    var id=$(this).attr('data-id');
   $.ajax({
       method:'GET',
       url:'/my/article/cates/'+id,
       success:function(res){
           if(res.status!==0){
           return layui.layer.msg('失败')
           }
           layui.form.val('edit-form',res.data)
       }
   })
    })
    $('body').on('submit','#edit_acte',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新成功')
                getArticleInfo();
                layui.layer.close(indexEdit)
            }
        })
       layui.layer.close(indexEdit);
        })
        // 根据id删除数据
        $('body').on('click','#article_delet',function(){
            var id=$(this).attr('data-id');
            layer.confirm('确定要删除吗？', {
               icon:1,title:'删除文章分类'
                },function(index){
                    $.ajax({
                        method:'GET',
                        url:'/my/article/deletecate/'+id,
                        success:function(res){
                            if(res.status!==0){
                                return layui.layer.msg(res.message)
                            }
                            layui.layer.msg('删除成功')
                            layui.layer.close(index)
                            getArticleInfo()
                        }
                    })
                   
                })
           
        })
   
})