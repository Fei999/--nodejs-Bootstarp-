var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port:3307
});
/* GET home page. */
router.post('/con', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var tit=req.body.tit;
    var con=req.body.con;
    var cl=req.body.cl;
    connection.query(`INSERT INTO item.template (title,class,con) VALUES ('${tit}','${cl}','${con}')`, function(err, rows, fields) { 
        res.send(rows)
    });
});
//后台管理
router.post('/tr', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    connection.query('SELECT * FROM item.template ', function(err, rows, fields) { 
        res.send(rows)
    });
});
//delete
router.post('/delete', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    connection.query('DELETE FROM item.template WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});
//修改接口
router.post('/gai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.gai;
    connection.query('SELECT * FROM item.template WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});
//确认修改
router.post('/qrgai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    var tit=req.body.tit;
    var con=req.body.con;
    var cl=req.body.cl;
    connection.query("UPDATE item.template SET title='"+tit+"',class='"+cl+"',con='"+con+"' WHERE id="+id , function(err, rows, fields) { 
        res.send(rows)
    }); 
});
//模板功能
router.get('/list', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    connection.query('SELECT * FROM item.template', function(err, rows, fields) { 
        res.send(rows)
    });
});
module.exports = router;
