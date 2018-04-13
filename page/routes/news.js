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
router.post('/tr', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    connection.query('SELECT * FROM item.news ', function(err, rows, fields) { 
        res.send(rows)
    });
});
router.post('/con', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var tit=req.body.tit;
    var time=req.body.time;
    var con=req.body.con;
    var op=req.body.op;
    connection.query(`INSERT INTO item.news (uid,tit,con,time) VALUES ('${op}','${tit}','${con}','${time}')`, function(err, rows, fields) { 
        res.send(rows)
    });
});
//修改接口
router.post('/gai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.gai;
    connection.query('SELECT * FROM item.news WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});
//确认修改
router.post('/qrgai', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    var tit=req.body.tit;
    var con=req.body.con;
    var op=req.body.op;
    connection.query("UPDATE item.news SET tit='"+tit+"',uid='"+op+"',con='"+con+"' WHERE id="+id , function(err, rows, fields) { 
        res.send(rows)
    }); 
});
//html
router.post('/list', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var op=req.body.op;
    connection.query('SELECT * FROM item.news WHERE uid='+op, function(err, rows, fields) { 
        res.send(rows)
    });
});
router.post('/list1', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var op=req.body.op;
    connection.query('SELECT * FROM item.news', function(err, rows, fields) { 
        res.send(rows)
    });
});
//后台管理
router.post('/tr', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    connection.query('SELECT * FROM item.news ', function(err, rows, fields) { 
        res.send(rows)
    });
});
//delete
router.post('/delete', function(req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    var id=req.body.id;
    connection.query('DELETE FROM item.news WHERE id='+id, function(err, rows, fields) { 
        res.send(rows)
    });
});

module.exports = router;
