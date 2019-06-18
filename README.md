# againNodeBlog

### 路由和API 之间的区别
- API: 前后端、不同端之间对接`url`的一个术语
- 路由：API的一部分，后端系统内部的一个定义

### mysql 配置
- cd /usr/local/mysql/support-files


### 封装exec函数，API使用exec操作数据库 创建库、表、SQL语句的语法和使用
```mysql
use `myblog`;
-- show tables;

-- insert into users (username,`password`,realname) values ('lisi','123','李四');

-- select * from users;

-- select id,username from users;

-- select * from users where username='zhangsan' and or `password`='123'

-- select * from users where username like '%zhang%'

-- select * from users where password like '%1%' order by id desc;

update users set realname='李四2' where username="lisi" 

delete from users where username='lisi'

select * from users where state = '1';

update users set state = '0' where username="lisi"; -- 软删除

insert into blogs (title,content,createtime,author) values('标题B','内容B',1560528038008,'lisi')

select version()
```

### 执行sql语句
```mysql
    delete http://localhost:8000/api/blog/del?id=3
    post http://localhost:8000/api/blog/new 
        body:{
            "title": "title100",
            "content": "content100"
        }
    update http://localhost:8000/api/blog/update?id=3
        body:{
            "title": "title101A",
            "content": "content102A"
        }
    
    login http://localhost:8000/api/user/login
        body: {
        "username": "lisi",
        "password": "123"
    }
```