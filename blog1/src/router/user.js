const {login} = require('../controller/user')
const { SuccessModel, ErrorModel } = require("../model/resModel");

const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    // 登录
    // 流程，先进/api/user/login，由客户端传cookie，服务端利用传进来的值，设置cookie，
    // 再进/api/user/login-test，由服务端返回cookie
    if (method === 'POST' && req.path === '/api/user/login'){
        const { username, password } = req.body;
        // const { username, password } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                // res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
                // 设置session
                req.session.username = data.username
                req.session.realname = data.realname
                console.log('req.session is',req.session)
                return new SuccessModel()
			} else {
				return new ErrorModel("登录失败");
			}
        })
        
    }

    // 登录验证的测试
    if(method === 'GET' && req.path === '/api/user/login-test') {
        // if(req.cookie.username){
        if(req.session.username){
            return Promise.resolve(new SuccessModel({
                // username: req.cookie.username
                session: req.session
            }));
        }
        return Promise.resolve(new ErrorModel('尚未登录'));
    }




}

module.exports = handleBlogRouter;