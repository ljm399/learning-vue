<script>
import { createVNode } from "vue"
import { h } from "vue";
import Rb from './dontlook.vue'

//一在optionAPI中,使用render函数与h函数
export default {
  render() {
    // return createVNode("div", { class: "red" }, "hello world")缩写即h函数
    //注意:,class可能会有错(因为类命名也是class这个关键字),所以用className代替
    return h("div", { className: "app" }, [
      h('h2', null, `当前计数为:${this.count}`),
      //1,触发事件方法一:箭头函数
      h('button', { onClick: () => this.count++ }, "点我+1"),

      //2,注意事项
        //1, 一定是onClick,不是onclick或其他
        //2,要加this无论使用methods还是data

      //3,触发事件方法二:普通函数
      h('button', { onClick: this.sub }, "点我-1"),

      //3,组件
      h(Rb)
    ])
  },

  data() {
    return {
      count : 0
    }
  },
  methods: {
    sub() {
      this.count--
    }
  }
}
</script>

<style scoped>

</style>