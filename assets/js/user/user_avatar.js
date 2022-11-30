$(function () {
    getUserInfo()
    // 1.1 获取裁剪区域的 DOM 元素
    var layer = layui.layer;
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview',
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function (e) {
        // e.preventDefault();
        // alert('a')
        $('#file').click();
    })
    $('#file').on('change', function (e) {
        // console.log(e.target.files)
        if (e.target.files.length === 0) {
            return layer.msg('请选择图片')
        }
        // 成功
        var file = e.target.files[0]
        // 生成本地的图片地址
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    $('#IMGupload').on('click', function (e) {
        e.preventDefault();
        // 转换成base64字符串图片的格式
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //   发送请求修改图像
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                //    console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res.data.user_pic);
            if (res.status !== 0) {
                return layer.msg('更新头像失败')
            }
            var $image = $('#image')
            // 1.2 配置选项
            const options = {
                // 纵横比
                aspectRatio: 1,
                // 指定预览区域
                preview: '.img-preview',
            }

            // 1.3 创建裁剪区域
            $image.cropper(options)
            var files = base64toFile(res.data.user_pic)
            var newImgURL = URL.createObjectURL(files)
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)        // 重新初始化裁剪区域

        }
    })
}
function base64toFile(dataurl, filename = 'file') {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
    })
}
