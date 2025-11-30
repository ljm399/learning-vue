<template>
  <div class="app">
    <h2 ref="h2">{{ message }}</h2>
    <button ref="btn" @click="changeMsg">改变数据</button>
    <refCpn ref="cpn"></refCpn>
  </div>
</template>

<script>
  import refCpn from './Refcpn.vue'
export default {
  components: { refCpn },
  data() {
    return {
      message : 'summit'
    }
  },

//ref获取组件/ref获取元素/ref获取实例
// $refs属性获取元素/实例/组件(组件/元素先有ref名称)
  methods: {
    changeMsg() {
      this.message = '峰'
      //1,不要随便获取dom并修改dom,必须要的话用ref属性

      //2,获取元素
      console.log(this.$refs.btn)
      console.log(this.$refs.h2)

      //3,获取组件(组件实例)
      //组件不是对象,因为你调用组件是可以多个指向一个组件同时组件里面又有不同的数据,所以组件不是对象,而是一个实例(以类去理解)
      console.log(this.$refs.cpn)

      //3.1 在父组件中可以直接调用子组件的方法
      this.$refs.cpn.add()

      //3.2 获取组件中的元素
      // console.log(this.$refs.cpn.$el)

      //3.3 若组件中有多个根节点,则获取的是第一个根节点
      console.log(this.$refs.cpn.$el)//#text(因为第一个节点是<>后面的空格即为文本节点)
      console.log(this.$refs.cpn.$el.nextElementSibling)//nextElementSibling获取该节点下一个元素即<div class="app">

      //4,组件实例还有俩个属性$root属性和$parent属性(了解),$children属性在Vue3中已废弃
      console.log(this.$parent)
      console.log(this.$root)//目前实例即App(里面有个changeMsg方法可以提示是本节点的方法)
      // this.$root.changeMsg()//不要调用,否则无限循环导致报错
      

    }
  }
}
</script>

<style scoped>

</style>

