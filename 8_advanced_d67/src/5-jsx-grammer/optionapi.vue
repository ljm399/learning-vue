<script lang="jsx">
// 使用jsx语法:script标签中,加lang="jsx",告诉这不是普通的js语法
import Rb from './dontlook.vue'

//一在optionAPI中,使用jsx语法
export default {
  render() {
    //return后面有括号原因
    /* 
    单行内容：如果你只返回一行的 JSX 代码，确实可以省略括号，像上面的例子一样。

    多行内容：如果返回的内容是多行的，使用括号是个好习惯，因为它可以避免一些潜在的语法问题，并提高可读性,
    
    即无论单或多行(下面是多行)可以不加扩号
    */
    return ( 
      <div class='app'>
        <h1>{this.count}</h1>
        {/* <button onClick={  this.count++ }>+1</button>  会报错 */}
        <button onClick={ () => this.count++ }>+1</button>
        <button onClick={ this.sub }>+1</button>
        <p>下面是组件</p>
        <Rb></Rb>
      </div>
    )
  },

  //#region 关于objectgrammer对象语法不能使用表达式
  /* 
    当时对象语法是{ this.count++ }报错
    原因:
     1,直接写表达式会导致渲染时立即执行，而不是在事件触发时执行,不符合component代码理念:组合 API 的核心思想是基于响应式数据来组织组件逻辑(重点响应式数据,你这直接执行就不是了)
     2,{ ()=>this.count++ }只有在事件发生时，才会执行其内部的逻辑如同
     click: function() {
       this.count++
     }当调用click时才会执行this.count++,而不是()=>this.count++会自动执行
  */
  //#endregion
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