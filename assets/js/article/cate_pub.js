$(function () {
    // 富文本
    initEditor()
    // 渲染下拉
    getCate()
    function getCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                var tp_cate = template('tp-cate', res)
                $('[name=cate_id]').html(tp_cate)
                layui.form.render()
            }
        })
    }
    // 初始化裁剪器
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    //  点击选择图片
    $('#choosePicture').on('click', function (e) {
        $('[type=file]').click()
    })
    $('[type=file]').on('change', function (e) {
        var file = e.target.files;
        if (file.length === 0) {
            return layui.layer.msg('请选择图片')
        }
        var newImgURL = URL.createObjectURL(file[0]);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域


    })
    // 设置状态为
    var art_state = '已发布'
    $('.layui-btn-primary').on('click', function () {
        art_state = '草稿'
    })
    $('#form-add').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                console.log(blob)
                fd.append('cover_img', blob)
                $.ajax({
                    method: 'POST',
                    url: '/my/article/add',
                    data: fd,
                    // 默认为true，上传的数据以字符串形式上传，当上传文件时不需要转换为字符串，所以改为false
                    processData: false,
                    // 表示前端发送数据的格式
                    // 默认是以字符串的形式 如 id=2019 & password=123456
                    // 无法传递复杂数据，所以改为false
                    contentType: false,
                    success: function (res) {
                        if(res.status!==0){
                            return layui.layer.msg(res.message)
                        }
                        layui.layer.msg(res.message)
                        location.href='/article/art_list.html'
                        window.parent.fun()
                    }
                })
            })

    })
})