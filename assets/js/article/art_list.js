$(function () {
    template.defaults.imports.dataFormat=function(data){
        const dt=new Date(data)
        var y=zeroize(dt.getFullYear())
        var m=zeroize(dt.getMonth()+1)
        var d=zeroize(dt.getDate())

        var hh=zeroize(dt.getHours())
        var mm=zeroize(dt.getMinutes())
        var ss=zeroize(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
    function zeroize(n){
        return n<10?'0'+n:n
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',//文章分类的id
        state: ''//状态
    }
    // 获取列表数据
    initTable()
    getCate()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if(res.status!==0){
                    return layui.layer.msg('获取列表失败')
                }
                layui.layer.msg('获取列表成功')
                // template渲染数据
                var acte_list=template('tpl-table',res) || ''
                $('tbody').html(acte_list)
                renderPage(res.total)
            }
        })
    }
    // 渲染下拉
    function getCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                var tp_cate=template('tp-cate',res)
                $('[name=cate_id]').html(tp_cate)
                layui.form.render()
            }
        })
    }
    $('#form-search').on('submit',function(e){
        e.preventDefault();
        var cate_id=$('[name=cate_id]').val()
        var state=$('[name=state]').val()
        q.cate_id=cate_id
        q.state=state
        initTable()
    })
    var laypage = layui.laypage;
    function renderPage(total){
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: total //数据总数，从服务端得到
            ,curr:q.pagenum
            ,limit:q.pagesize,
            layout:["count",'limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            jump: function(obj,first){
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                if(!first){
                   initTable()
                  }
                
            }
          });
    }
    $('tbody').on('click','#cate-delete',function(e){
        var len=$('.btn-delete').length;
        console.log(len)
        var id=$(this).attr('data-id');
        layer.confirm('确定要删除吗？', {icon:0,title:'delete'
        }
            ,function(index){
                $.ajax({
                    method:'GET',
                    url:'/my/article/delete/'+id,
                    success:function(res){
                        if(res.status!==0){
                            return layui.layer.msg(res.message)
                        }
                        layui.layer.msg("删除成功")
                        if(len===1){
                            q.pagenum=q.pagenum===1?1:q.pagenum-1
                        }
                        initTable()
                    }
                })
           layer.close(index)
            })
       
    })
})