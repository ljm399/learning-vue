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

const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
  fn()
}

const obj = {
  name : 'cao',
  age : 18
}

watchFn(function foo() {
  console.log('foo', obj.name),
  console.log('age', obj.age)
})

console.log('-------------age发生变化------------')
obj.age = 20
dep.notify()

console.log('-------------name发生变化------------')
obj.name = 'zhang'
//缺点每次都要手动调用notify, 才能触发依赖
//solveway:自动监听属性变化