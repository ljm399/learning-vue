# 一.额外知识补充

### 1.1. Vue3+TS项目的运行





### 1.2. 项目的备份和Git管理

- 初始化git仓库
  - git init -- 创建本地仓库
  - git add .
  - git commit -m 'xx'



- 使用虚拟机打开文件, 它会生成很大杂七杂八的文件在你原来的文件中





# 二. 城市页面的搭建

### 2.1. 获取定位的API

```javascript
const getLocation = () => {
  navigator.geolocation.getCurrentPosition(res=>{
    console.log(res);
  },err=>{
    console.log(err);
  })
}
```

- 拿到的是经纬度
  - 想进行下一步, 把经纬度发给 高德地图或百度地图相关api, 拿到具体位置





### 2.2. 城市页面的跳转





### 2.3. 城市的页面搭建

#### 2.3.0. 跳转时底部tab-bar的消失的方法

- 方式一: 

  ```javascript
  router/index.js中
  {
    path: '/cities',
    component: () => import('@/views/cities/cities.vue'),
    meta:{
      isShowTabBar: true
    }
  }
  
  ---------------
  App.vue
      <tab-bar v-if="!route.meta.isShowTabBar"></tab-bar>
    </div>
  </template>
  
  <script setup>
  import TabBar from './components/tab-bar/tab-bar.vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  
  ```

- 方式二

  ```javascript
    <div class="cities top-page">
      <div>cities</div>
    </div>
  
  .cities {
    position: relative;
    z-index: 9;
    height: 100vh;
    background: #fff;
    overflow-y: auto;
  }
  
  该样式一般放在全局样式文件中(common.css), 因为多处需要, 使用在class添加top-page就可以
  ```

  



#### 2.3.1 顶部的搜索框的搭建

- UI组件库中获取

#### 2.3.2. Tab的切换组件

- UI组件库中获取

#### 2.3.3. 获取城市的数据

- 网络请求的分层结构

  ```javascript
  vue
    const cityStore = useCityStore()
    cityStore.fetchAllCities()
    const {allCities} = storeToRefs(cityStore)
    
  -------------
  vue -> store的action
  export const useCityStore = defineStore('city', {
    state: () => ({
      allCities: {}
    }),
    actions: {
      async fetchAllCities() {
        const res = await getCities()
        this.allCities = res.data
      }
    }
  })
  
  ------------------------
  store的aciton -> service/modules/cities.js
  import HYRequest from '../request'
  export function getCities() {
    return HYRequest.get({
      url: '/city/all'
    })
  }
  
  -----------------------
  service/modules/cities.js  + service/request/axios封装文件中  --> 一起被service/index.js导出
  export * from './modules/cities'
  ```



- top和content的滚动条问题

  ```javascript
   // 方式一: 缺点: 左边的滚动条和内容不对应
    // .top {
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   z-index: 9;
    // }
    // .content {
    //   margin-top: 100px;
    // }
  
    //方式二: 改进:
    .content {
      height: calc(100vh - 100px); // 100px是top的高度
      overflow-y: auto;
    }
  ```

  



#### 2.3.4. 城市数据的展示

- 方法: 使用外部组件时 ( 外部组件库的使用方法 --可以应用到其他组件中 )

  - 通过观察vue在浏览器中的插件, 观察 外部组件 里面数据变化

  - 同时自己明白:  < van-tabs v-model:active="active">的v-model:active="active"绑定的值是动态,所以一定有用

  - 然后你的需求是 const active = ref(0) 的 active如何通过切换tab 从而绑定到 服务器放回数据的对应数据

  - 所以之后要知道 官网一定有这样的属性提供,  发现是name, 所以问题解决

    ```javascript
          <van-tabs v-model:active="active">
            <template v-for="(value,key,index) in allCities" :key="key">
              <van-tab :title="value.title" :name="key"></van-tab> 
          -- 1. name可以动态绑定到 服务器放回数据的对应数据  
            </template>
          </van-tabs>
    
    	---- 2. 然后和下面的active就也绑定到了 ,这是name的作用
      const active = ref(0)
      const currentCity = computed(() => allCities.value[active.value])
    ```

    

    

- IndexBar

- 两层for循环 和 封装组件

  - 不管几层循环 你先在当前组件中完成 再 去把代码复制粘贴到 对应的子组件中

    ```javascript
          <template v-for="(value,key,index) in allCities" :key="key">
          
          // 先完成,别管封装
            <!-- <van-index-bar>
              <template v-for="(item,index) in value.cities">
                <van-index-anchor :index="item.group" />
                <template v-for="city in item.cities">
                  <van-cell :title="city.cityName" />
                </template>
              </template>
            </van-index-bar> -->
            
            // 完成后复制上面的代码, 粘贴到子组件
            <CitiesGroup v-show="active === key" :citiesGroup="value.cities" />
          </template>
    ```





# 基础知识: for循环遍历对象

- ​    < div>{{ value }}< /div> key对应的值,然后你通过value.cities拿到具体的值,而不是key.cities 

```javascript
 <template v-for="(value,key,index) in allCities" :key="key">
    <!-- <div>{{ value }}</div> key对应的值,然后你通过value.cities拿到具体的值,而不是key.cities -->

    <!-- <div>{{ key }}</div> cities, hotCities,title -->

    <!-- <div>{{ index }}</div> -->
```







#### 2.3.5. 热门数据的展示

- 问题一:  在热门城市时, 右边是A, 导致后面BCD都不对应不到相应的城市

- 问题二: 默认是[A-Z], 导致如V这个不是任何城市的开头字母也占据一组,导致都不对应不到相应的城市

  - 同时解决 问题一,二

    ```javascript
    <van-index-bar :sticky="false" :index-list="indexList"> -- :index-lis这个属性官网找到
    
    -----------------------
    script中
    const indexList = computed(() => {
     const cityIndex = props.citiesGroup.map(item => item.group)
     cityIndex.unshift('#') --- 往前面添加个#,就行了 
     return cityIndex
    })
    ```

    

# 基础知识二: item最后一行和flex问题

- 问题: 在使用 `display: flex` 和 `justify-content: space-around` 对元素进行布局时，如果最后一行的元素数量不足以填满整行，这几个元素会自动分散对齐，导致它们之间的间距过大，破坏了整体的对齐效果

  - 方法一: 

    1. **使用 `justify-content: flex-start` 并配合 `margin`：**

    2. 将容器的 `justify-content` 设置为 `flex-start`，让所有元素都从左侧开始排列。

    3. 然后给每个元素（除了每行的最后一个）添加 `margin-right` 来创造它们之间的间距。这种方法能保证所有行都左对齐。

       ```javascript
          <template v-for="hotCity in hotCities">
             <span class="city">{{ hotCity.cityName }}</span>
           </template>
           <span class="city">#</span> --> 多出来的一个
       
         .list {
           display: flex;
           // justify-content: space-around;
           步骤一: justify-content: flex-start;
       	.....
           .city {
             步骤二: margin-right: 13px;
             ......
           }
       ```

       

  

  - 方法二

    - **添加“占位”伪元素**

      ```javascript
      <template v-for="hotCity in hotCities">
        <span class="city">{{ hotCity.cityName }}</span>
      </template>
      <span class="city">#</span> --> 这是多出来的一个, 下面3个station就是为了占满
      <span class="station"></span>
      <span class="station"></span>
      <span class="station"></span>
      
      ----------------------
      站位元素必须添加width, 否则没效果
      .station {
        width:21%
      }
      ```

      

  - 方法三:
    - **改用 CSS Grid 布局：**
      - 对于这种网格布局，CSS Grid 其实是更现代、更合适的工具



### 2.4. 点击选中其中一个城市

- 城市数据的保存

  - 用pinia 代替了 事件总线的作用

    - pinia里面存储的值,全局组件都可以用

  - pinia存储的都是 一个对象, 而不是单个值, 比如cityName , 因为服务器返回的就是一个对象

    - 所以你保存到pinia也要是个对象

      ```javascript
      <van-cell :title="city.cityName" @click="cityClick(city)" />
      
      
      const cityClick = (city) => {
      cityStore.currentCity = city
      router.back()
      }
      
      store/city.js
      export const useCityStore = defineStore('city', {
        state: () => ({
          allCities: {},
          currentCity: {cityName: '广州'}
        }),
      ```

      

- 回显的效果

  - 放回的页面, 直接从pinia里面拿就行

    ```javascript
    <div class="city" @click="pushCities">{{ currentCity.cityName }}</div>
    
    注意 storeToRefs from 'pinia'
    const { currentCity } = storeToRefs(useCityStore()) 
    ```

    






# 知识补充: 模板中使用ref不用.value,但script中需要

- 模板不用是因为底层帮你做了





# 三. 首页继续搭建

- 格式化日期

  - 先npm install dayjs

    ```javascript
    import dayjs from 'dayjs'
    export const formatTime = (time) => {
      return dayjs(time).format('YYYY-MM-DD')
    }
    ```

    

### 3.1. 日期的选择功能

##### 3.1.1. 日历选择都是去对应组件库里那就行了

- 不用自己做, 很麻烦



##### 3.1.2. 问题: 当日期是31天, 其下一天怎么不是32而是1呢

- 方法一

  ```javascript
  const nowDate = new Date()
  // console.log(nowDate.getDate()) // 获取日, 2
  // console.log(nowDate.getMonth()) // 获取月, 9
  const newDate = nowDate.setDate(nowDate.getDate() + 1)
  ```

- 方法二

  ```javascript
  export const Add1 = (time) => {
    let newTime = time + 24 * 60 * 60 * 1000
    return dayjs(newTime).format('YYYY-MM-DD')
  
    // 简化(使用dayjs里面的add方法),这个方法可以不用获取时间戳即不用再.getTime()
    // return dayjs(time).add(1, 'day').format('YYYY-MM-DD')
  }
  
  ------ vue文件中
  const nowDate = new Date().getTime() // geiTime是为了获取时间戳
  console.log(nowDate)
  const startDate = ref(formatTime(nowDate))
  const endDate = ref(Add1(nowDate))
  ```



##### 3.1.3. 使日期组件的height为100%

```
本地
<style> 
  .box { -->  .box即自己的div的最外层div,而不是组件的标签或类名
    --van-calendar-popup-height: 100%;
  }
</style>

全局: 
common.css
.root {
    --van-calendar-popup-height: 100%;
}
```

- 注意: common.css 里面 .root { primary-color: 这里的颜色就为主题颜色}





### 3.3. 中间三个行内元素的布局

- 样式布局: 左边div包裹两个, 右边一个
  - flex:1 给 左边,  而不是右边
  - 中间那个因为 在左边(flex:1)的div中 ,故 width: 50%



### 3.4. 服务器获取热门建议数据 和 请求的分层结构

- 发送网络请求

  - store/modules/home.js  

  ```javascript
    actions: {
      async fetchHotSuggests() {
        const res = await fetchHotSuggests()
        this.hotSuggests = res.data
      }
    }
  })
  
  service/modules/home.js
  import HYRequest from '../request'
  export function fetchHotSuggests() {
    return HYRequest.get({
      url: '/home/hotSuggests'
    })
  }
  ```

  
- 传递子组件

  - home.js

  ```javascript
  <HeaderSearchBox :hotSuggests="hotSuggests"></HeaderSearchBox>
  
  const hotSuggestsStore = useHotSuggestsStore()
  hotSuggestsStore.fetchHotSuggests()
  const {hotSuggests} = storeToRefs(hotSuggestsStore)
  ```

  
- 子组件展示

  ```javascript
  const { currentCity } = storeToRefs(useCityStore())
  
  <!-- 热门推荐 -->
   <div class="hotSuggests section">
      <template v-for="(item,index) in hotSuggests" :key="index">
        <div
  ```

  

### 3.5. 样式的封装 

- 当你发现 下面的元素布局相识, 直接给相识的样式添加section sectionPart1 就可以复用样式了, 要是 复用有副作用,在去专门设置覆盖就行了

```css
.location {
    display: flex;
    height: 40px;
    padding: 5px 15px;
    .city {
      flex:1;
      line-height: 40px;
    }
    .myLocation {
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 22px;
        margin-left: 5px;
      } 
    }
  }

  .checkInTime,.section {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 10px 15px;
    padding-right: 30px;
    .staying,.section-part1 {
      flex: 1;
      display: flex;
      .during {
        width: 50%;
        text-align: center;
        line-height: 40px;
      }
    }
    .leaving,.section-part2 {
      display: flex;
      flex-direction: column;
      div {
        margin: 0 auto;
      }
    }
  }
```



