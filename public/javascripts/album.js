//上傳照片
function upload() {
    if (!$.cookie('userID') || $.cookie('userID') == "null") {
        alert("請先登入會員");
        location.href = '/public/login.html';
        return;
    }
    var img = document.getElementById('u_img_file');
    if (!/.(gif|jpg|jpeg|png|GIF|JPG|PNG|JPEG)$/.test(img.value)) {
        alert("圖片類型不正確！");
        return;
    }
    var formData = new FormData();
    formData.append('file',img.files[0]);
    var url = "/album/upload?account=" + $.cookie('userID');
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            if (res.status == 0) {
                alert("上傳成功！");
                history.go(0);
            }
        },
        error: function (err) {
            console.log(err);
        }
        
    });
}

//修改預覽圖示
$("#u_img_file").change(function () {
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("u_img").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}