let num = 1
console.log(num)
//则打印的num也改变
num = 2

//响应式数据放在对象中
let obj = {
  num: 1,

}

//打印那些在函数里面统一管理使用(一般放于类中后面会写)
function fn() {
  //则obj.num改为2
  console.log(obj.num)
}

fn()//1
obj.num = 2
fn()//2
