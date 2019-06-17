 const {exec } = require("../db/mysql")

const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `
	if(author) {
		sql += `and author=${author} `
	}
	if(keyword) {
		sql += `and title like '%${keyword}%' `
	}
	sql += `order by createtime desc; `
	return exec(sql)
}

const getDetail = (id) => {
	//
	return {
			id: 1,
			title: "标题A",
			content: "内容A",
			createTime: 1546610491112,
			author: "zhangsan"
		}

}

const newBlog = (blogData = {}) => {
	// 一个blog对象
	console.log(blogData,'new blogData')
	return {
		id: 3 //新建博客id
	}
}

const updateBlog = (id, blogData = {}) => {
	// id 就是更新博客的 id
	// blogData 是一个博客对象，包含 title content 属性
	console.log('update blog', id, blogData)

	return true
}

const delBlog = (id) => {
	return true
}	


module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
};