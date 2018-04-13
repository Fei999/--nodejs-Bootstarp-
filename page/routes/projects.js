/*
* @Author: Busy
* @Date:   2017-11-09 19:19:16
* @Last Modified by:   Busy
* @Last Modified time: 2017-12-13 10:16:33
*/

var express = require('express');
var mysql      = require('mysql');
var router = express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port:3307
});
/* GET home page. */
var temp=''
router.post('/con', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var sel=req.body.sel;
    connection.query(`INSERT INTO item.projects (uid,img) VALUES ('${sel}','${temp}')`, function(err, rows, fields) { 
        res.send(rows)
    });
});
//后台管理
router.post('/tr', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    connection.query('SELECT * FROM item.projects ', function(err, rows, fields) { 
        res.send(rows)
    });
});
//delete
router.post('/delete', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    console.log(id)
    connection.query('DELETE FROM item.projects WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});
// //修改接口
router.post('/gai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.gai;
    connection.query('SELECT * FROM item.projects WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});
// //确认修改
router.post('/qrgai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var uid=req.body.uid;
    var id=req.body.id;
    connection.query("UPDATE item.projects SET img='"+temp+"' WHERE id="+id , function(err, rows, fields) { 
        res.send(rows)
    }); 
});
//HTML接口
router.post('/list', function(req, res, next) {	
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    connection.query('SELECT * FROM item.projects WHERE uid='+id , function(err, rows, fields) { 
        res.send(rows)
    });
});
// img
router.post('/img',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    var form = new formidable.IncomingForm();
    form.uploadDir = 'public/upload'  //图片的存放路径
    form.parse(req,function(err,fields,files){
        console.log(fields,files);
        for(i in files){
            var file = files[i];
            var fName = (new Date()).getTime();
            switch(file.type){
                case 'image/jpeg':
                fName = fName+'.jpg';
                break;
                case 'image/png':
                fName = fName + '.png';
                break;
                case 'image/gif':
                fName = fName + '.gif';
                break;
            }
            var newPath = 'public/upload/' + fName
            fs.renameSync(file.path,newPath);
            res.send(newPath)
            temp=fName
        }
    })

})
module.exports = router;

