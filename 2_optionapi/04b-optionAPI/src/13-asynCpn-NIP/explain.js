// asyn异步组件
// 打包(npm run build)然后部署到服务器,最后展示给用户
// 由于包里面先展示html,然后js再去修饰,但js若不异步组件而形成的包,那用户要等很久才能看到页面
// 所以使用异步组件,打出要先修饰html小包,其他展示不需要展示的排后面加载,提高渲染速度

//方法:
//js和组件不同

//js文件中,然后再main.js中引入和打包

export function sun(num1, num2) {
  return num1 + num2
}

//dist包里面,开头是app指的是你编译的包,开头是chunk是依赖的库,后缀是.map是给js文件的提示
//还有其他就是你分出来的包
