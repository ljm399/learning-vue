<script>
  //optionApi中映射状态(computed属性中,当有多个状态,01是单个状态)
  import { mapState } from "vuex";
  export default {
    //computed里面传入的是函数(模板中拿到的是返回值),而store.state.count传过来的也是函数(拿到的是返回值)
    computed: {
      //mapState映射状态:数组语法
      ...mapState(['coun0', 'name0', 'avatarUrl0']),
      //本质:无论compositionApi还是optionApi,其本质都是$store.state.xx因为展示在页面上的就是$store.state.xx
      avatarUrl() {
        return this.$store.state.avatarUrl
      },

      //mapState映射状态:对象语法(当想要修改状态名时)
      ...mapState({
        count2: state => state.count,
        name2: state => state.name
      })
    }
  };
</script>

<template>
  <div class="app">
    <!-- 1,template中使用多个状态 -->
    <h3>模板中:{{ $store.state.count }}</h3>
    <h3>模板中:{{ $store.state.avatarUrl }}</h3>

    <hr>
    <!-- 2,计算属性:mapState映射状态:数组语法 -->
    <h3>optionApi的计算属性中</h3>
    <h3>数组语法</h3>
    <h3>{{ count0 }}</h3>
    <h3>{{ name0 }}</h3>
    <h3>{{ avatarUrl0 }}</h3>
    <h3>本质{{ avatarUrl }}</h3>
    <!-- 3,计算属性:对象语法 -->
    <h3>对象语法</h3> 
    <h3>{{ count2 }}</h3>
    <h3>{{ name2 }}</h3>

    <hr>
    <!-- 4.1,setup中的计算属性:一步步实现让this.$store从没有到绑定的是和optionAPI一样的值 -->
    <h3>compositionApi</h3>
    <h3>compositionApi中:{{ ccount }}</h3>
    <h3>compositionApi中:{{ cname }}</h3>
    <h3>compositionApi中:{{ cavatarUrl }}</h3>

    <!-- 4.2,使用封装函数(数组语法) -->
    <h3>compositionApi封装函数:</h3>
    <h3>数组语法</h3>
    <h3>{{ name4 }}</h3>
    <h3>{{ count4 }}</h3>
    <h3>{{ avatarUrl4 }}</h3>

    <!-- 4.2.2对象语法 -->
    <h3>compositionApi对象语法:</h3>
    <h3>{{ name3 }}</h3>
    <h3>{{ count3 }}</h3>


    <!-- 4.3,不要使mapState(mapState是为optionApi而生) -->
    <h3>不使用mapState:{{ count }}</h3>
    <h3>不使用mapState:{{ avatarUrl }}</h3>
    <button @click="add">add</button>
  </div>
</template>

<script setup>
//setup中获取状态:当我们有多个状态要获取
//mapState映射辅助的是optionApi(而不是compositionApi),所有这里用mapState难
import { computed, toRefs } from "vue"; 

//warning报错:上面的script中引入了mapState不用再引入
import { useStore } from "vuex";
import useState from '@/hooks/useState'

 
//setup中使用
//1,直接一步步使用(核心步骤让this.$store.sate的this.$store有正确的绑定,这里没有this.$store)
// const store = useStore();

// //问题:mapState 生成的函数内部依赖 this.$store 来访问 Vuex 的 store。但在 <script setup> 环境中，不存在 this 这个组件实例，所以 this.$store 是 undefined，直接调用会报错

// const { name, count, avatarUrl } = mapState(["count", "name", "avatarUrl"]);//解构的name是函数,因为没有$store
// console.log("name",name,"count",count,"avatarUrl",avatarUrl);//undefined,undefined,undefined

// // 解决
// // const cname = computed(() => name4.bind({ $store: store }));//里面不能是箭头函数,因为传入的本身就是函数,有其返回值即this.$store.state.count了
// const cname = computed( name.bind({ $store: store}));
// const cavatarUrl = computed(avatarUrl.bind({ $store: store }));
// const ccount = computed( count.bind({ $store: store}))


//2,封装函数(数组语法)
const { name:name4, count:count4, avatarUrl:avatarUrl4 } = useState(["count", "name", "avatarUrl"])
//2.2,对象语法
const { name3, count3, avatarUrl3 } = useState({
  count3: 'count',
  name3: 'name',
  avatarUrl3: 'avatarUrl'
})


//3,不使用mapState
//直接对store.state对象解构
const store = useStore();
// console.log(store.state)//代理对象,store.state.xx是函数(你拿到的是其返回值)
// const { name, count, avatarUrl } = store.state;//但解构出来的不是响应式
// 解决办法
const { name, count, avatarUrl } = toRefs(store.state)

function add() {
  store.commit('add')
}
</script>

<style scoped>

</style>