//通过类收集依赖
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    if(fn) {
      this.reactiveFns.push(fn)
    }
  }

  //执行依赖
  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

const obj = {
  name : 'cao',
  age : 18
}

const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
  fn()//执行一次,以便收集依赖
}

//由于每次都要手动调用notify, 才能触发依赖
//解决办法:自动监听属性变化
// //defineProperty方法(vue2)
// Object.defineProperty() 的作用是定义或修改对象属性，并允许通过 get 和 set 方法来控制属性的访问和修改行为，这正是 Vue 2 实现数据响应式的底层核
// 即只要你访问或修改了属性,就会触发get或set

//设object.key为了监听每个key
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    //#region 传统写法
      /* 
      set : function (newValue) {
      value = newValue
      dep.notify()
      },
      get: function () {
        return value
      }

      */
    //#endregion    

    //es6写法
    set(newValue) {
      value = newValue
      dep.notify()
    },
    get() {
      console.log('value',value)
      return value
    }

    //#region get和set使用
     /* 
      get:每次访问依赖时会调用,同时必须return value,这里的value是'cao'即obj.name和20即obj.age

      set:当每次动用obj内部时会调用,如这
      1,newValue是get获取的value,一般会让其obj.name = value
      2,dep.notify()是执行内部依赖
      3,不用返回值
     */
    //#endregion
  })
})




//Proxy方法(vue3)

// ------------------业务代码----------------------------


watchFn(function foo() {
  console.log('foo', obj.name),
  console.log('age', obj.age)
})

console.log('-------------age发生变化------------')
obj.age = 20

console.log('-------------name发生变化------------')
obj.name = 'zhang'
