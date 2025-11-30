//lifeCycle生命周期:每个组件都会有创建,挂载,更新,销毁(卸载)等几个阶段,我们称之为生命周期
//每个阶段都会触发一个钩子函数(生命周期函数),因为在某个时期可以回调又叫回调函数

//过程:
/* 
  1,先创建组件如App,app.mounted('#app')

  2之前先触发函数:beforeCreate()
  2,创建组件实例(里面有data,methods等)
  触发函数:created(重要,作用:2.1发送网络请求,2.2事件监听如eventBus里面的数据,2.3this.$watch()里面的数据)

  3,template模板编译成render函数(vue原理有讲过)

  beforeMount()
  4,挂载到虚拟dom->真实dom->页面显示div/span/p等
  mounted(重要,元素已经挂载,可以获取使用):注意到这步才能获取到元素(this.$refs.xxx获取原生dom)

  beforeUpdate()
  5,数据更新如message改变,然后又形成render函数->虚拟dom->真实dom(这一步经常发生和循环)
  update()

  beforeUnMount()
  6,不在使用时v-if='false'销毁组件:将之前在虚拟dom的组件删除
  unMount(重要,取消时间监听,销毁实例)
  
 */