//通过类收集依赖
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {

    if(fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() {
    if(reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }

  }

  //执行依赖
  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}



//自动收集依赖
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


//自动监听并调用依赖(监听多个对象)
//一,defineProperty方法
/* function reactive(obj) {

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
        dep.depend()
        // console.log('value',value)
        return value
      },
      set(newValue) {
        //4,所有要利用到obj内部的在set中写
        const dep = getDepend(obj, key)
        // console.log('newValue',newValue)
        value = newValue
        dep.notify()
  
      }
  
    })
  })
  return obj
} */




//二,Proxy方法(vue3)
//#region 解释Proxy方法
  /* 
    1,new Proxy(obj, handler)
        Proxy 是 JavaScript 中的一个内建对象，用于创建一个对象的代理，它可以用来拦截并自定义对象的基本操作（如 get、set、delete 等）。
        obj 是目标对象，即你要进行响应式操作的对象。
        第二个参数 handler 是一个对象，包含了对对象操作的拦截方法。在这里，我们定义了两个方法：get 和 set

    2, set: function(target, key, newvalue, receiver)
        set 方法是拦截对象的赋值操作（即 obj[key] = newValue）。
        target 是被代理的对象（即 obj）。
        key 是你访问或赋值的属性名。
        newvalue 是赋给 key 的新值。
        receiver 是代理对象本身

    3,Reflect.set(target, key, newvalue, receiver)
        这是一个 Reflect API 的方法，功能是直接设置 target 上的 key 属性为 newvalue，并返回布尔值表示是否设置成功
        Reflect.set 可以确保赋值操作正常完成，不会破坏目标对象的行为，它是标准化的 set 方法，比直接使用 target[key] = newvalue 更加可靠

    4,get: function(target, key, receiver)
        get 方法是拦截对象的属性访问操作

    5,return Reflect.get(target, key, receiver)：
        Reflect.get 是标准的 get 方法，负责从目标对象 target 中获取 key 对应的值。
        返回的是 target[key] 的值
  */
//#endregion
function reactive(obj) {
  const objProxy = new Proxy(obj, {
    set: function(target, key, newvalue, receiver) {
      Reflect.set(target, key, newvalue, receiver)
      const dep = getDepend(obj, key)
      dep.notify()
    },
    get: function(target, key, receiver) {
      const dep = getDepend(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
      
    }
  })
  return objProxy
}

// ------------------业务代码----------------------------
//这时对象可以放在然后位置,如不用必须在defineProperty后面,因为deifineProperty被函数包裹
const obj = reactive({
  name : 'cao',
  age : 18
})

const obj2 = reactive({
  name : 'cao2',
  age : 28
})


watchFn(function foo() {
  console.log('obj,foo的name', obj.name)
  console.log('obj,foo的age', obj.age)
  console.log('objfoo的age', obj.age)
})

watchFn(function bar() {
  console.log('obj2,bar的age', obj2.age)
  console.log('obj2,bar的age', obj2.age)
})



console.log('-------------obj的age发生变化------------')
obj.age = 20

console.log('-------------obj2的age发生变化------------')
obj2.age = 39
