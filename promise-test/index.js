const fs = require('fs')
const path = require('path')



// callback 方式获取一个文件的内容
// function getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname, "files", fileName);
// 	fs.readFile(fullFileName, (err, data) => {
// 		if (err) {
// 			console.error(err);
// 			return;
//         }
//         callback(JSON.parse(data.toString()));
// 	});
// }

// // 测试 callback-hell
// getFileContent('a.json', aData => {
//     console.log("a", aData);
//     getFileContent(aData.next, bData => {
//         console.log("b", bData);
//         getFileContent(bData.next, cData => {
//             console.log("c", cData);
//         })
//     })
// })


function getFileContent(fileName) {
    return new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if(err) {
                reject(err)
                return
            }
            resolve(JSON.parse(data.toString()))
        })
    }); 
}

getFileContent("a.json")
	.then(aData => {
		console.log("a data", aData);
		return getFileContent(aData.next);
	})
	.then(bData => {
		console.log("b Data", bData);
		return getFileContent(bData.next);
	})
	.then(cData => {
		console.log("c Data", cData);
	});




