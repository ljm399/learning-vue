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

//对象不能放在使用该对象的方法的后面如不能再defineProperty后面
const obj = {
  name : 'cao',
  age : 18
}

//自动收集依赖
//#region 理由
/* 
  //自动收集思想:当foo函数有obj.name,若外面obj.name发生变化,则执行foo函数

  //文件4-autoMonitor的缺点:无论是否属性值是否发生变化即,都会执行每个watchFn函数(即bar函数不依赖name,但name发生变化时都会执行)
  看下面怎么写的,以及那个图片结合看
*/
//#endregion

//实现过程:封装个函数,可以通过obj的key获取对应的dep
const objMap = new WeakMap()
function getDepend(obj, key) {
  //1,根据obj获取map
  let map = objMap.get(obj)
  if(!map) {
    map = new Map()//不能用weekMap,因为其key必须是对象,而map的key是字符串
    objMap.set(obj, map)
  }

  //2,根据obj的key获取dep
  let dep = map.get(key)
  if(!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}




// const dep = new Depend()
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()//执行一次,以便收集依赖
  reactiveFn = null
}

//自动监听并调用依赖
//一,defineProperty方法
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {


    //能实现自动收集依赖,主要是get可以收集依赖(即监听那个地方有调用依赖,如foo函数的obj.name则get可以获取obj和key)
    get() {
      //过程
      //1,收集依赖,拿到对应的obj和key
      //2,通过obj和key拿到对应的dep(没有使用obj内部)
      const dep = getDepend(obj, key)
      //3,把fn添加到dep的reactiveFns中(可以在set中写,但顺序是先get再set)
      dep.addDepend(reactiveFn)
      return value
    },
    set(newValue) {
      //4,所有要利用到obj内部的在set中写
      const dep = getDepend(obj, key)
      dep.notify()

      value = newValue
    }

  })
})




//二,Proxy方法(vue3)

// ------------------业务代码----------------------------




watchFn(function foo() {
  console.log('foo的name', obj.name),
  console.log('foo的age', obj.age)
  console.log('foo的age', obj.age)

})

watchFn(function bar() {
  console.log('bar的age', obj.age)
})

  //不足:里面有两个obj.name,则foo()会被执行两次


console.log('-------------age发生变化------------')
obj.age = 20

console.log('-------------name发生变化------------')
obj.name = 'zhang'

