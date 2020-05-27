var express = require('express');
var router = express.Router();
var multer = require('multer');
var memberModel = require('../models/memberModel.js');

//設定儲存檔案格式
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/photos');
    },
    filename:function(req,file,cb){
        var str = file.originalname.spilt('.');
        cb(null,Date.now() + '.' + str[1]);
    }
});
var upload = multer({ storage: storage });

//上傳照片
router.post('/upload',upload.single("file"),function(req,res,next){
    memberModel.findOne({ account: req.query.account},function(err,data){
        data.photos.push(req.file.filename);
        data.markModified('photos');
        data.save(function (err) {
            if (err){
                res.json({"status":1, "msg": "error"});
            }
            else {
                res.json({"status":0, "msg": "success", "photos":data.photos});
            }
        });
    });
});

module.exports = router;