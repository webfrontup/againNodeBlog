const mysql = require('mysql');

// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    port: '33062',
    database: 'myblog'
})

// 开始链接
con.connect()

// 执行 sql 语句
// const sql = "select * from users;";
// const sql = "select id,username from users;";
const sql = 'update users set realname="李四" where username="lisi"';

con.query(sql, (err,result) => {
    if(err){
        console.error(err)
        return
    }
    console.log(result,'result')
})

// 关闭链接
con.end();