<template>
  <div class="app">
    <h1>About</h1>
    <p>{{ eel }}-{{ sundae }}-{{ oboe }}</p>
    <button @click="translate">translate</button>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      oboe: 'oboe'
    };
  },
  props: {
    eel: String,
    sundae: String
  },
  emit:['translate'],
  methods: {
    translate() {
      this.$emit('translate', '双簧管');
    }
  },
}
</script>

<style scoped>

</style>

