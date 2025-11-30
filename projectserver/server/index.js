const express = require('express')
const fs =require('fs')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 3000

//#region cors
/* 
从 http://localhost:8080即vue 向 http://127.0.0.1:3000 发出的请求被阻止，因为在端口 3000 的服务器响应中没有包含必要的 CORS 头。
*/
//#endregion
app.use(cors())
//读取json文件


let data;
try {
  data = JSON.parse(fs.readFileSync(path.join('.', 'data.json'), 'utf-8'));
} catch (error) {
  // 检测文件存在与否
  console.error('Error reading data file:', error);
}

// 要是不检查文件是否存在则直接这样
const data2 = JSON.parse(fs.readFileSync(path.join('.', 'data2.json'), 'utf-8'));

//实现home/3(即:id)步骤一
//req是request请求对象,res是response响应对象
app.get('/home', (req, res) => {
  res.json(data)
});

//实现home/3(即:id)步骤二
//req,res两者一个是请求对象,res是响应对象
app.get('/home/:id', (req, res) => {
  //从request的params属性中获取id
  const { id } = req.params
  // console.log('data',data.info[1].id)

  //放回筛选后的数据
  data.info.forEach(item => {
    if (item.id === id) {
      res.json(item)
    }
  })

  //要是没有则状态码为404,且res.json({mssage:'没有找到'})即返回message信息
  res.status(404).json({mssage:'没有找到'})
  // res.json(data)这里不用
});


//直接home?id代替上面两个步骤(推荐)
app.get('/About', (req, res) => {

  //从request的query属性中获取id,即从xx/About?id=3中获取id,id是你输入路径是自己加的,而不是固定,所有叫动态路由
  const { id } = req.query

  //筛选
  data.info.forEach(item => {
    if (item.id === id) {
      res.json(item)
    }
  })
  
  //res.json(data)作用:要是没有找到id则返回所有数据
  res.json(data2)
  // res.status(404).json({mssage:'没有找到'})这里不需要
});


//post请求设置
//以下是用户post数据到服务器中存储(一般用于注册,账号验证等,这里直接存储就行)
// 使JSON 数据能够被解析，你需要使用 express.json() 中间件
app.use(express.json())
app.post('/About', (req, res) => {

  //从 request 对象的 body(是用户post请求传来的第二个参数) 中获取数据
  const newItem = req.body
  data.info.push(newItem)

  //当状态码为 201 时，表示资源已被创建,然后返回你想传入的数据
  res.status(201).json(newItem)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



//npm i -D nodemon(如同live server),然后在package.json中添加"dev": "nodemon ./server/index",然后npm run dev启动

//ping registry.npmjs.org问题是网络,换热点



//#region 解释JSON.parse(fs.readFileSync(path.join('server', 'data.json'), 'utf-8'))
/* 
    fs.readFileSync()
  fs 模块：Node.js 的内置模块，用于文件系统操作。
  readFileSync(path, options)：这是一个同步方法，用于读取指定路径的文件。它会阻塞执行，直到文件被完全读取。
  path：文件的路径。
  options：可选参数，指定编码格式（在这里是 'utf-8'）。
  2. path.join(__dirname, 'data.json')
  path.join(...) 方法用于拼接路径片段，返回一个规范化的路径字符串。它会自动处理不同操作系统之间的路径分隔符问题
  如const directory = 'folder';
  const filename = 'file.txt';
  在 Windows 上：输出将是 folder\file.txt
  在 Unix/Linux 上：输出将是 folder/file.txt

  3. JSON.parse(...)
  JSON.parse()：这是一个全局方法，用于将 JSON 字符串解析为 JavaScript 对象。
  在这里，fs.readFileSync(...) 返回的是一个字符串（文件内容），然后 JSON.parse() 将这个字符串转换为一个 JavaScript 对象，以便在代码中使用。
*/
//#endregion

//#region 全过程,问题与概念
/* 创建简单的本地服务器:文件夹格式Project/server/data.json,Project先npm init初始化,然后会有一个package.json文件里面可以加  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node ./server/index"自己添加
},从而npm run dev快速启动 

一,可能遇到的问题:
1,当遇到网络问题,与代理有关,把代理关了

1.2netstat -an | find "3000"看是否防火墙关了若是 TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING(聆听)则没问题


concept概念:
1,配置文件:package.json中
生产环境需要的依赖 ➔ dependencies如express，一般来说不用加 -g 或 -D，而是直接安装
仅开发阶段需要的依赖 ➔ devDependencies如下载时要-D：开发依赖，仅在开发环境中使用

2,这里的res.json和使用时的res.json
服务器处理请求，使用 res.json(data) 发送 JSON 数据作为响应。
客户端接收到响应后，使用 res.json() 解析响应体，得到 JSON 数据进行处理
*/
//#endregion

//#region 解释请求头
  /* 
    请求体(data: { name: 'Bob' })是post请求的第二个参数,即req.body,是用户post请求传来的数据
    不是请求头(headers)(headers: { token })

    请求体（body）：用于携带实际的业务数据，如表单数据、用户输入的数据等。只有POST、PUT等请求方法才会包含请求体

    请求头:作用:
    1,把认证信息和业务数据混在一起分开
    
    2,认证和安全相关的内容一般放在请求头,为了分离敏感信息和业务数据，遵循HTTP协议规范

    3,请求头可以设置缓存以减少网络流量或加快加载速度,调试信息如(headers: {'Content-Type': 'application/json'}服务器会将请求体解析成JSON格式等，所有这些都和数据本身无关，但对请求的处理有帮助
  */

//#endregion
