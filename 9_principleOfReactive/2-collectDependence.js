const obj = {
  name : 'cao',
  age : 18
}

//收集依赖
const reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
  //先执行一次
  fn()
}

watchFn(function foo() {
  console.log('foo', obj.name),
  console.log('age', obj.age)
})

obj.name = 'cao2'
