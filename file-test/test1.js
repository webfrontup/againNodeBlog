const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname,'data.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) => {
    if(err){
        console.error(err)
        return
    }
    // data 是二进制类型,需要转换为字符串
    console.log(data.toString());
})

// 写入文件
const content = '这是新写入的内容\n';
const opt = {
    flag: 'a' //追加写入。覆盖用'w'
}
// 写入的文件名称，内容，配置，回调函数
fs.writeFile(fileName,content,opt, (err) => {
    if (err) {
        console.error(err)
        return
    }
})

// 判断文件是否存在
fs.exists(fileName,(exist) => {
    console.log(exist,'exist')
})

