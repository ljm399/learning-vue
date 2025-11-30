# cli脚手架/vite脚手架

### 1. cli / vite :脚手架(template,script,style) 对应的打包工具:webpage(cli) / vite(vite)

####  1.1. cli: command line interface(命令行接口)

- 基本操作

  -  cli创建: 

    - 下载: npm install -g @vue/cli(-g可以写在后面); 
    - 升级: npm update -g @vue/cli; 

    - 编译文件:
      - 初始化
        - vue create 项目名称(不支持大写),
      - 打包
        - npm run build

  -  vite创建: 

    - 下载: npm install -g create-vite(-g可以写在后面); 
    - 升级: npm update -g create-vite

    -  编译文件: npm init vite@latest 加入项目名称

    

- cli和vite安装依赖: npm install 
  - 自己安装好才有的配置信息即(devDependencies,dev是设备,dependencies是依赖)

- 组件命名:

  - vue3的组件名必须是多单词的,否则会报错,

    - 可以通过下面方式来在.eslintrc.js 文件禁用

      ```javascript
      module.exports = {
       rules: {
        'vue/multi-word-component-names': 'off'
       }
      }
      ```

      

 

- 浏览器vue devtools插件安装
  - 谷歌商城搜索安装
  - 浏览器vue devtools安装
  - 去github上搜索vue devtools下载,然后安装







 npm install less-loader -D

-  < style lang='less' >



 换镜像:npm config set registry https://registry.npmmirror.com

*/