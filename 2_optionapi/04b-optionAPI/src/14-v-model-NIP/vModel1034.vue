<template>
  <div class="app">
    <h2>
      {{ MV }}-{{ plateau }}
    </h2>
    <button @click="change">translate</button>
  </div>
</template>

<script>
export default {
  //tip提示String:string是大写String不然报错
  props:{
    MV:{
      type:String,
      default:''
    },
    plateau:{
      type:String,
      default:''
    }
  },
  emits: ['update:MV', 'update:plateau'],
  methods: {
    change() {
      this.$emit('update:MV', '橡胶'),
      this.$emit('update:plateau', '高原')
    }
  }  
}
</script>

<style scoped>

</style>

