<script>
//mutations的重要原则是mutations必须是同步函数:因为devtools需要捕捉到mutaion的日志，如果异步代码执行的话devtools无法感知到mutation。
//而actions就有此而生(网络请求是异步的)
export default {
  methods: {
    add() {
      this.$store.dispatch('addAction')
    },
    changeName() {
      //传递参数
      this.$store.dispatch('changeNameAction', 'action的Name')
    },

    //参数是对象
    // emitObj() {
    //   this.$store.dispatch('changeUsersAction', {
    //     name: 'action对象的name',
    //     age: 19989
    //   })
    // },

    //其他风格传递
    emitObj() {
      this.$store.dispatch({
        type: 'changeUsersAction',
        name: 'action对象的name',
        age: 19989
      }
      )
    },
  }
}

</script>

<template>
  <div class="app">
    <h3>Actions属性/Actions核心/action属性</h3>
    <h3>name:{{ $store.state.name }}</h3>
    <h3>当前技数:{{ $store.state.count }}</h3>
    <h3>$store.state.users[1].age:{{ $store.state.users[1].age }}</h3>
    <button @click="add">发起action修改count</button>
    <button @click="changeName">发起action修改name</button>
    <button @click="emitObj">发起action修改对象</button>
  </div>
</template>


<style scoped>

</style>