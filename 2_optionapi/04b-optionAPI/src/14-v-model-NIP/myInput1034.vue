<template>
  <div class="app">
    <h3>{{ modelValue }}</h3>
    <input type="text" :value="modelValue" @input="ipEvent">
    <hr>
    <h3>{{ msg }}</h3>
    <input type="text" :value="msg" @input="emitMsg">
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    msg: {
      type: String,
      default: "",
    },
  },
  emits: ['update:modelValue', 'update:msg'],
  methods: {
    ipEvent(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    emitMsg(event) {
      this.$emit('update:msg', event.target.value)
     }
  }

}
</script>

<style scoped>

</style>

