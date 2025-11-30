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
function reactive(obj) {

  Object.keys(obj).forEach(key => {
    let value = obj[key]
  
    Object.defineProperty(obj, key, {
  
      //能实现自动收集依赖,主要是get可以收集依赖(即监听那个地方有调用依赖,如foo函数的obj.name则get可以获取obj和key)
      get() {
        const dep = getDepend(obj, key)

        //优化,不用自己传参数,在类里面搞定
        // dep.addDepend(reactiveFn)
        dep.depend()

        return value
      },
      set(newValue) {
        const dep = getDepend(obj, key)
        value = newValue
        dep.notify()
  
      }
  
    })
  })
  return obj//则const obj=reactive(...的obj可以使用,然后才有foo函数里面obj.name
}




//二,Proxy方法(vue3)

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
