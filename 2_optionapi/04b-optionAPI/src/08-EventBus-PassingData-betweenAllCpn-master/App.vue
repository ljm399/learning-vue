<!-- 当你完成了event-bus.js在取消全部注释 -->

<!-- <template>
  <div class="app">
    <other-cpn></other-cpn>
  </div>
</template>

<script>
import eventBus from './utils/event-bus'
import otherCpn from './otherCpn.vue';
export default {
  components: {
    otherCpn,
  },
  //创建函数时,拿到数据
  created() {
    //eventBus事件总线
    //接受
    eventBus.on('passingEvent',
        //  (age, name) => {
        //   console.log(age, name)
        // }
       passingEvent  
     )
  },


  //destroy function销毁函数一般叫destroy instance销毁实例(当页面销毁时一定要养成销毁函数的习惯):作用,为了避免内存泄漏,销毁函数

  //函数是指EventBus.on方法的第二个参数即(age,name) => {console.log(age, name)},销毁这个函数必须要有其他名,使用不能使用() => {},改为以下步骤
  //1,先命名,然后把(age,name) => {console.log(age, name)}变为passingEvent
  methods: {
     passingEvent(age, name) {
       console.log(age, name)
     }
  },

  //2,销毁函数或destroyEvent销毁事件
  unmounted() {
    eventBus.off('passingEvent', passingEvent)
  }
}
</script>

<style scoped>

</style>
 -->
