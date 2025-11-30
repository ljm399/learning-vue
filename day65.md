# 一. 额外基础知识点补充

### 1.1. line-height默认是1.1

- 因为 normalize.css 使其默认为1.1
  - line-height - font-size 得出来的值 除以 2,
  - 然后分别放在字体的上下两个位置, 使得字体有居中的现象
  - 但当浏览器版本较低时, 出现的问题: 
    - 当 减去后( 行高- 字体大小) 得到的值 不是个整数 ,而是有小数的如1.8
    - 它会先 在字体的 下面分1 , 上面为0.8(但较低版本的浏览器的是上下取整), 所以0.8为0,
    - 所以导致 虽然设置padding:15px 0; 有还是没有居中效果, 字体靠着上面
    - solve: 在 common.js 的 .root 或 对应标签 设置 line-height:1





### 1.2. window10的chorome定位

- chorome获取不到, 是因为要连接远程谷歌服务器, 要是没翻墙 则获取位置失败





# 二. 首页的搭建

- 基础知识补充
  - 颜色的渐变是 background-imgage 而不是 background-color
- 问题:  因为你之前复用 css样式, 导致height有个固定值, 所以导致之后的元素可能会消失
  - 解决: 给消失的元素 的 前一个 标签 设置 height: auto (因为前一个元素height有个固定值)


### 2.1. 搜索按钮的点击

- 搜索搭建

- 点击跳转到搜索页 

  - 携带参数

    ```javascript
    const search = () => {
    router.push({
      path: '/search',
      query: {
        startDate: startDate.value,
        endDate: endDate.value,
        city: currentCity.value.cityName
      }
    })  
    ```

  - 参数展示

    - 方式一(推荐)
    
      ```javascript
      <h2 class="startDate">{{ $route.query.startDate }}</h2>
      <h2 class="endDate">{{ $route.query.endDate }}</h2>
      <h2 class="city">{{ $route.query.city }}</h2>
      ```
    
    - 方式二
    
    ```javascript
      <div class="search">
        <div class="startDate">{{ router.query.startDate }}</div>
        <div class="endDate">{{ router.query.endDate }}</div>
        <div class="city">{{ router.query.city }}</div>
      </div>
    </template>
    
    <script setup>
    import { useRoute } from 'vue-router'
    const router = useRoute()
    ```
    
    








### 2.2. 类比的数据展示

- 请求类比数据: 
  - homeStore
    - state
    - actions
- 展示数据
  - 水平滚动
    - overflow-x : auto
    - :: -webikit-scrollbar { dispaly: none }   --- 不会就搜索
    
      - 问题: 滚动条还在
        - 这个问题跟 **Less 的嵌套规则** 有关。
          - 前面加& 即 &::-webkit-scrollbar {}
            - 这样才正确绑定到 `.categories` 这个元素的滚动条上。
          - 不加&
            - **作用在 `.categories` 内部子元素的滚动条**，而不是 `.categories` 自身的滚动条
    
      





### 2.3. 列表的数据展示

### 2.3.1. 请求第数据 和 点击按钮加载更多

- 请求房屋列表的数据
  - homeStore
    - houselist: []
    - actions
    
  - this.houselist.push(...res.data)
  
    

- 保存currentPage
  - homeStore
    - currentPage
    - currentPage++

```javascript
serve/home.js
export function fetchHomeHouselist(currentPage) {
  return HYRequest.get({
    url: '/home/houselist',
    params: {
      page: currentPage
    }
  })
}

store/home.js
export const useHomeStore = defineStore('home', {
  state: () => ({
    homeHouselist: [],
    currentPage: 1
  }),
      actions: {
    async fetchHomeHouselist() {
      const res = await fetchHomeHouselist(this.currentPage)
      this.homeHouselist.push(...res.data)
      this.currentPage++
    }
  }
    
    
vue: 触发 网络请求 这个行为
homeStore.fetchHomeHouselist()    
```





# 基础知识补充: home页面内容超出但不能滚动

- 问题原因: home页面下面有 导航栏(tab-bar), 其 position: fix: 挡住了超出的内容,而超出的内容高度还未多出tab-bar的高度, 所以 滚动条没效果

- 解决: 

  ```
  给home{
  	padding-bottom: 50px; --- 50px是tab-bar的高度
  }
  ```

  





### 2.3.2. 不同的类型展示数据

- house-item-v9
  - itemData
  
    
  
- house-item-v3
  - itemData

样式

- 图片: 服务器因为设置好了宽高比

  - 所以直接 : width:100%, 就可以实现效果, 至于外部排列如何,看起父元素div的width(一般48%)

- 图片外部div布局

  - .item-inner 和 .cover的作用

  ```css
  <div class='list'>
      <div class="home-item-v9">
          <div class="item-inner">
              <div class='cover'>
  	          <img :src="itemData.image.url" alt="">
  			</div>
          </div>
      </div>
  </div>
  
  .list{
    display: flex;
    flex-wrap: wrap;
      .home-item-v9 {
        width: 50%;
        .item-inner {
          padding: 15px 15px 0 0; -- 作用: 使list不用设置justify-content: space-between以及其他样式调整
          .cover{
              border-radius:5px; --- 作用: 设置边角位圆边
              overflow: hidden;
          	img {
           	 width: 100%;
              }    
            }
          
        }
      }
  ```

- 当你使用 `display: -webkit-box` 搭配 `-webkit-line-clamp` 实现多行省略时，padding-bottom会影响效果
  - 解决 用 `margin-bottom` 代替 `padding-bottom`
    - `margin` 是作用在外部，不会被 `-webkit-line-clamp` 裁剪掉。
       但 `padding-bottom` 属于内容区域，被裁掉了



### 组件 和 v-if 使用方式

```javascript
  <HomeItemV9 v-if="item.discoveryContentType === 9" :item-data="item.data"></HomeItemV9>   

这个效果和<div v-if='...'> <HomeItemV9 ...>效果一样,但这个会多嵌套一层div,影响之后自己的布局
```



### 基础知识: v-model的原理

```javascript
<v-md :model-value="oak" @update:model-value="oak = $event"></v-md>
```

- 用来 处理组件库 样式

  ```javascript
    <van-rate
      :model-value="Number(itemData.commentScore)"  --> 而不是v-model='itemData.commentScore'
      size="15"
      color="#ffd21e"
      void-icon="star"
      readonly allow-half
    />
  ```







# 三. 首页的处理

### 3.1. 数据展示的undefined 与 报错处理

- ?.

  ````
  {{ itemData?.priceTipBadge?.text }}
  ````

  - 缺点: 要写很多个?.

- v-if

  ```javascript
  <div class="text" v-if="itemData.priceTipBadge">{{ itemData.priceTipBadge.text }}</div>
  ```

  





### 3.2. useScroll

#### 3.2.1. isReachBottom

-  方式一: 缺点: 要传入多个回调函数, 但你只用知道他有无到底部就可以了, 传入回调函数是多余的

```javascript
import {onMounted, onUnmounted, ref} from 'vue'
export default function useScroll(...callback) {
  // 监听滚动
  const scrollHandler = () => {
    const clientHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    // console.log(clientHeight, scrollHeight, scrollTop) // 667 2962 2295
    if(clientHeight + scrollTop >= scrollHeight) {
      if(callback.length) {
        callback.forEach(item => {
          item()
        })
      }
    }
  }

  // 取消监听, 防止其他页面也触发
  const cancelScrollHandler = () => {
    window.removeEventListener('scroll', scrollHandler)
  }
  onMounted(() => {
    window.addEventListener('scroll', scrollHandler)
  })
  onUnmounted(() => {
    cancelScrollHandler()
  })
}

------------------------------------
vue
useScroll(() => {
  homeStore.fetchHomeHouselist()
  console.log('滚动了');
},() => {
  console.log('取消了');
})

```





#### 3.2.2. scrollTop

- ref -> watch

  - 方式二

    ```javascript
    export default function useScroll() {
      const isReachBottom = ref(false)
      const scrollHandler = () => {
        const clientHeight = document.documentElement.clientHeight
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = document.documentElement.scrollTop
        // console.log(clientHeight, scrollHeight, scrollTop) // 667 2962 2295
        if(clientHeight + scrollTop >= scrollHeight) {
          isReachBottom.value = true
          console.log('到底部了');
        }
      }
    
      // 取消监听, 防止其他页面也触发
      const cancelScrollHandler = () => {
        window.removeEventListener('scroll', scrollHandler)
      }
      onMounted(() => {
        window.addEventListener('scroll', scrollHandler)
      })
      onUnmounted(() => {
        cancelScrollHandler()
      })
      return {
        isReachBottom
      }
    }
    
    --------------------------------------
    vue文件
    const { isReachBottom } = useScroll()
    watch(isReachBottom, () => {
      homeStore.fetchHomeHouselist().then(() => {
        isReachBottom.value = false
      })
    })
    ```

    

- computed

  - // 这里使用computed 而不是 watch的好处是: 
    1. 只要依赖的数据发生变化, computed就会重新计算
    2. computed是响应式的, 会自动追踪依赖
    3. 当处理的逻辑比较复制使用watch, 简单就直接使用computed

  ```javascript
  const isShowSearchBar = computed(() => {
    return scrollTop.value > 350
  })
  // watch(scrollTop, ()=> {
  //   if(scrollTop.value > 350) {
  //     isShowSearchBar.value = true
  //   }else {
  //     isShowSearchBar.value = false
  //   }
  // })
  ```

  



#### 3.2.3. 节流的处理

- 节流
  - 在事件触发**过程中**周期性执行, 每个设定的时间(如100ms) 调用一次
- 防抖
  - 事件触发取消后
  - 这里不是防抖, 因为要是滚动很久,那样式一直显示不出来
- 安装
  - npm install underscore
  - 官网: 
    - 先去github搜索underscore, 里面有官网 https://underscorejs.org/#throttle

- underscore
  - throttle
  - 另外一个选择: 先不处理





### 3.3. Tabbar不选中的问题

- 当你的图标是你自定义,而不是组件库里面, 才有的问题

  - 问题: xxx/ order 切换为 xxx/message, 只有 文本颜色改变, 图片未变

    - 因为currentIndex还是0, 文本变了,因为文本你是绑定给了组件库, 所以组件库帮你修改了(如下)

      ```javascript
      <van-tabbar v-model="currentIndex" active-color="#ff9854" inactive-color="#000" route>
      ```

- solve

  ```javascript
  let currentIndex = ref(0)
  const route = useRoute()
  watch(route, () => {
      const index = tabBarData.findIndex(item => item.path === route.path)
      if(index === -1) return
      currentIndex.value = index
  })
  ```

  -  if(index === -1) return 作用
    - 因为findIndex什么都没找到就返回-1, 防止index绑定-1 这种情况





### 3.4. SearchBar封装和展示

- 有时候 设置 fontsize,可以其他 和height-line 一样的效果: 关于调节两个并列行内元素位置的效果



- 解释样式

  ```javascript
    background-image: url('@/assets/img/home/home-sprite.png');
    background-position: -199px -155px;
    background-size: 207px 192px;
  ```

  - 当你写 `background-position: -31px -153px;`

    - 向左移动 31 像素；
    - 向上移动 153 像素；

  - `background-size: 207px 192px;`

    **作用：**
     告诉浏览器要把整张背景图 **缩放到指定尺寸**（宽 207px，高 192px）





### 3.5. 开始和结束时间共享

- mainStore
  - startDate
  - endDate



# 基础知识: 单项数据流 和 compute

```javascript
const {startDate,endDate} = storeToRefs(useMainStore())

// 方式一
// startDate.value = formatTime(startDate.value, 'MM.DD')
// endDate.value = formatTime(endDate.value, 'MM.DD')

// 方式二
const startDateStr = computed(()=> formatTime(startDate.value, 'MM.DD'))
const endDateStr = computed(()=> formatTime(endDate.value, 'MM.DD'))
```

| 特性       | 直接赋值 (方法一)                           | 使用 `computed` (方法二)         |
| :--------- | :------------------------------------------ | :------------------------------- |
| **响应式** | ❌ **否** (只在 setup 时执行一次)            | ✅ **是** (依赖项变化时自动更新)  |
| **数据源** | ⚠️ **修改/污染**了原始数据(不符合单项数据流) | ✅ **保持**原始数据不变，派生新值 |
| **推荐度** | 🔴 **不推荐**                                | 🟢 **强烈推荐** (Vue 的最佳实践)  |



```javascript
// 日历组件
const onConfirm = (value) => {
    // 这里可以推荐通过action来修改store里面的数据(因为符合单项数据流)
    mainStore.startDate = formatTime(value[0])
    mainStore.endDate = formatTime(value[1])
    mainStore.stayDays = stayCount(mainStore.startDate, mainStore.endDate)
    show.value = false
  }
```



# 样式布局问题

### 1. input 的placeholder文本超出就省略号

```
  input {
    width: 100%;
    margin-left: 10px;
    border: none;
    outline: none;
    background-color: transparent;
    text-overflow: ellipsis;     /* 超出显示省略号 */
    white-space: nowrap;         /* 不换行 */
    overflow: hidden;            /* 超出部分隐藏 */
  }
  input::placeholder {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
```



### 2. 适配: input的width在PC端 和 移动端都占满

```css
 .content {
    height: 45px;
    display: flex; ---- 关键点一
    padding: 0 10px; 
    background-color: #eee;
    .left {
      display: flex;
      flex:1;  --------- 关键点二
      overflow: hidden;
      .city {
		......
      }
      .stayTime {
          .......
      .input { --- 最好嵌套
        overflow: hidden;
        flex: 1;  ----------- 关键点三
        line-height: 45px;
        margin-left: 10px;
        input {
        width: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        text-overflow: ellipsis;     /* 超出显示省略号 */
        white-space: nowrap;         /* 不换行 */
        overflow: hidden;            /* 超出部分隐藏 */
        }
        input::placeholder {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        }
```



### 3. 调节png的大小 与 位置

```css
  img {
    position: absolute;
    right: 15px;
    
    // 上下居中
    top: 50%;
    transform: translateY(-50%);
    
    // 调节大小
    width: 20px;
    height: 20px;
    }
```



