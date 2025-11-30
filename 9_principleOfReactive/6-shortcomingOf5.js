//通过类收集依赖
class Depend {
  constructor() {

  //#region 文件5-autoCollectDependence不足
    /* 
      主动监听:当foo函数有obj.name,若外面obj.name发生变化,则执行get函数后set函数
      主动收集:然后obj.name会找到对应的dep,然后执行相应的函数(即foo函数)
      文件5-autoCollectDependence不足:当foo函数里面有两个obj.name,则foo()会被执行两次
      原因:因为obj的key虽然是同一个age,同时对应的dep是相同的但dep都会存储在reactiveFns数组中,所有执行两次dep.notify()
     */
  //#endregion
  
  //solve:存储数组前判断fn是否重复
   //方法一
   //1.1
    this.reactiveFns = []

    //方法二
    //2.1
    // this.reactiveFns = new Set()
  }

  addDepend(fn) {
    //1.2,没结果
    // for(let fn2 of this.reactiveFns) {
    //   if(fn || fn2 !== fn) {
    //     this.reactiveFns.push(fn)
    //   }
    // }


    //1.3改进:
    //因为1.2,this.reactiveFns.push(fn)放在for循环里面导致重复添加,导致重复添加this.ractiveFns.length个fn到数组中
    //同时set函数不能重复添加,当重复时,set函数会跳过便无dep.nodify(),则1.2就会没结果
    
    for(let fn2 of this.reactiveFns) {
      if(fn === fn2) {
        return
      }
    }
    this.reactiveFns.push(fn)


    //2.2
    // if(fn) {
    //   this.reactiveFns.add(fn)
    // }
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


//自动监听并调用依赖(监听一个对象)
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
      // console.log('value',value)
      return value
    },
    set(newValue) {
      //4,所有要利用到obj内部的在set中写
      const dep = getDepend(obj, key)
      // console.log('newValue',newValue)
      value = newValue
      dep.notify()

      //#region 关于value=newValue的执行顺序
        /* 
          在set中必须先执行value=newValue,再执行dep.notify(),否则obj.name=20但值还是不变即18

          原因:
          当 watchFn 执行 foo 或 bar 时，它会触发 obj 的 get 方法，从而将 foo 和 bar 注册为对 obj.name 和 obj.age 的依赖
          当属性 obj.age 被重新赋值（例如 obj.age = 20）时，set 方法的 dep.notify() 会执行所有依赖函数
          如果 value = newValue 在 dep.notify() 之后执行，那么 foo 和 bar 中访问 obj.age 时看到的还是旧值
        */
      //#endregion

    }

  })
})




//二,Proxy方法(vue3)

// ------------------业务代码----------------------------



watchFn(function foo() {
  //#region 文件5-autoCollectDependence不足
    /* 
      主动监听:当foo函数有obj.name,若外面obj.name发生变化,则执行get函数后set函数
      主动收集:然后obj.name会找到对应的dep,然后执行相应的函数(即foo函数)
      文件5-autoCollectDependence不足:当foo函数里面有两个obj.name,则foo()会被执行两次
      原因:因为obj的key虽然是同一个age,同时对应的dep是相同的但dep都会存储在reactiveFns数组中,所有执行两次dep.notify()
     */
  //#endregion

  console.log('foo的age', obj.age)
  console.log('foo的age', obj.age)

})

// watchFn(function bar() {
//   console.log('bar的age', obj.age)
// })



console.log('-------------age发生变化------------')
obj.age = 20


