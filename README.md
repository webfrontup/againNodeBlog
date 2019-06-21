# againNodeBlog

### 操作
- cd blog1 `npm run dev`
- cd html-test `http-server -p 8001`
- nginx 将8001和8000代理到8080
```
server {
    listen  8080;
    server_name  localhost;
    location / {
        proxy_pass  http://localhost:8001;
    }
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
    }
}
```
- 浏览器地址 需要先登录 所以 `http://localhost:8080/api/user/login?username=lisi&password=123`
- 再到首页 http://localhost:8080
- 代理完成

### 路由和API 之间的区别
- API: 前后端、不同端之间对接`url`的一个术语
- 路由：API的一部分，后端系统内部的一个定义

### mysql 配置
- cd /usr/local/mysql/support-files


### 封装exec函数，API使用exec操作数据库 创建库、表、SQL语句的语法和使用
```mysql
use `myblog`;
-- SET SQL_SAFE_UPDATES = 0;
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

### 登录
- 核心: 登录校验 & 登录信息存储
- cookie 和 session、session写入redis
- 开发登录功能，和前端联调(用到nginx反向代理)

### cookie
- 存储在浏览器的一段字符串(最大5kb)
- 跨域不共享
- 存储的是结构化的数据（类似obj key-value）
- 每次发送http请求，会将请求域的cookie一起发送给server
- server 可以修改cookie 并返回个浏览器
- 浏览器也可以通过js修改cookie（有限制）

### 客户端查看cookie,三种方式
- 浏览器中 Response Headers里面的cookie
- chorme中application的storage中的cookie项
- console端输入document.cookie


### 注意事项
- 用get方式通过cookie和后端通信，会暴露对应字段(username)
- 用session在server端存储用户信息 来，解决cookie的缺陷：cookie中存储userid，server端对应username 


### 如果session直接是js变量，放在nodejs内存中造成的问题：
- 1，进程内存有限，访问量过大，内存暴增：
- 2，正式线上运行时多进程，进程之间内存无法共享
- 3，用redis解决
- ![redis](https://github.com/webfrontup/againNodeBlog/blob/master/img/redis.png)
- ![processMemoryModel](https://github.com/webfrontup/againNodeBlog/blob/master/img/processMemoryModel.png)

### redis
- web server 最常用的缓存数据库，数据存放在内存中
- 相比于 mysql，访问速度快(内存和硬盘不是一个数量级的)
- 但是成本更高，可存储的数据量更小
- 将 web server 和 redis 拆分为两个单独的服务
- 双方都是独立的，都是可扩展的
### 为何session适用redis？
- session 访问频繁，对性能要求极高
- session 可不考虑断电丢失数据的问题
- session 数据量不会太大
### 为何网站数据不适用redis？
- 操作频率不是太高（相比于session操作）
- 断电不能丢失，必须保留
- 数据量太大，内存成本太高

### 登录验证联调
- 登录功能依赖cookie，必须用浏览器来联调
- cookie跨域不共享，前端和server端必须同域
- 用nginx做代理


### 进程内存模型
stack栈中存放js基础类型变量 Heap堆中存放应用类型变量(数组，函数。。。)

### 安装 redis
- Windows http://www.runood.com/redis/redis-install.html
- Mac 使用 brew install redis
- redis-server redis-cli 双端口执行 （“127.0.0.1:6379>”）
- set myname yyccQQu
- get myname
- keys * 查看所有存储的redis数据
- del myname

### nginx 
- nginx文件地址 `/usr/local/etc/nginx/nginx.conf`
- 高性能web服务器，一般用于静态服务、负载均衡
- 反向代理

### 日志
- 访问日志 access log(server端最重要的日志)
- 自定义日志(包括自定义事件，错误记录等)
- 放入线上之后会将资源放入文件夹中，所以需要nodejs文件操作

### nodejs文件操作
- 使用nodejs stream(节省CPU和性能)
- 日志功能开发和使用
- 日志文件拆分，日志内容分析
- 日志要存储到文件中
- 日志拆分 可以以时间拆分
- 日志拆分实现方式 Linux的crontab命令，即定时任务
- 将 access.log 拷贝并重命名为 2019-MM-DD.access.log
- 清空 access.log 文件，继续积累日志
- 日志分析 这里的日志是按行存储的，一行就是一条日志，使用nodejs的readline(基于stream)即可


### crontab
- 设置定时任务，格式：*****command -> *从左到右：分钟小时 年月星期
-  crontab -e
```
# 每天凌晨 0点00分执行该脚本
* 0 * * * sh /Users/xxx/adm/againNodeBlog/blog1/src/utils/copy.sh

```

### IO操作的性能瓶颈
- IO包括 "网络IO" 和 ”文件IO“
- 相比于CPU计算和内存读写，IO的突出特点就是：慢！
- 如何在有限的硬件资源下提高IO的操作效率？

### 安全（webserver方面）
- sql注入：窃取数据库内容
```
    用username:'lisi'  password: xxxxx;登录

    user myblog;
    select username,realname from users
    where username='lisi'; -- 'and password=123';
```
- XSS攻击：窃取前端cookie内容
```
    npm i xss 
    将需要传递的参数用xss包裹起来
    const title = xss(blogData.title);
	const content = xss(blogData.content);
	const author = xss(blogData.author);
```
- 密码加密：保障用户信息安全
```
    万一数据库被用户攻破，最不应该泄露的就是用户信息
    攻击方式： 获取用户名和密码，再去尝试登录其他系统
```

### server 和 前端的区别
- 服务稳定性
- 安全 (包括登录验证)
- 内存CPU (优化，扩展)
- 集群和服务拆分
- 日志记录
- 流程图
![流程图](https://github.com/webfrontup/againNodeBlog/blob/master/img/%20flow_chart.png)
