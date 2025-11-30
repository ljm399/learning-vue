//mixins混合/mixin混合(了解):有局部和全局
//若data,methods,created组件有,会混合,若相同则组件的优先
export default {
  data() {
    return {
      msg: "hello"
    }
  },
  created() {
    console.log('i am local Mixin')
  }
}