# 一. Loading展示

### 1.1. Loading组件搭建





### 1.2. Loading状态保存

- mainStore

  ```javascript
  export const useMainStore = defineStore('main', {
    state: () => ({
      startDate: startDate,
      endDate: endDate,
      stayDays: stayDays,
      isShowLoading: true
    }),
    actions: {
  
    }
  })
  ```

  





### 1.3. Loading改变状态

- HYRquest中的拦截器中， 因此就不用每个页面调用，然后设置对应方法

```javascript
const mainStore = useMainStore()
class HYRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(config => {
      mainStore.isShowLoading = true
      return config
    }, err => {
      mainStore.isShowLoading = false
      return err
    })
    this.instance.interceptors.response.use(res => {
      mainStore.isShowLoading = false
      return res
    }, err => {
      mainStore.isShowLoading = false
      return err
    })
  }
```







# 二. 详情页

### 2.1. 点击Item跳转

- 多个组件如(v9 和 v3)都是点击后跳转 所以 代码重复 要 封装

  - 封装后跳转： 通过把方法如(@click) 放在组件的调用上(如HomeItemV3)即组件的外部 , 而不是组件(如HomeItemV3) 里面

  ```vue
  
  <template v-for="(item,index) in homeHouselist" :key="item.data.houseId">
            <HomeItemV3 v-if="item.discoveryContentType === 3" :item-data="item.data" 			     @click="pushToDetail(item.data)"></HomeItemV3>
            <HomeItemV9 v-if="item.discoveryContentType === 9" :item-data="item.data" @click="pushToDetail(item.data)"></HomeItemV9>        
    </template>
  
  // 相同逻辑代码
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const pushToDetail = (itemData) => {
    router.push(`/detail/${itemData.houseId}`)
    console.log('跳转到detail', itemData.houseId)
  }
  ```


### 解释: 组件上的@click方法 和 $attrs

- @click="pushToDetail(item.data)绑定到HomeItemV3这个组件的根组件上面
  -  如在 HomeItemV9上面的class类则绑定在 根组件的 $attrs上面





### 2.2. 详情页导航搭建



### 2.3. 详情页数据请求和 数据管理的位置

- 数据请求 和 保存数据位置的(选择）

  - 在公司你看团队的代码是保持在pinia 还是 页面中,然后再选择保存数据再哪里

  - 这里演示保存到页面vue中

  ```javascript
  //发送网络请求,并保持数据到本地
  const detailInfos = ref({})
  
  // 数据处理, 因为res数据非常大,要对其进行处理
    // 开始时detailInfos.value为空,但mainPart不报错,因为computed 属性是惰性求值的，这意味着它只会在实际被访问时才会执行计算函数
  const mainPart = computed(() => detailInfos.value.mainPart)
  
  getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
  })
  ```

  

- 页面管理



### 2.4. 详情页轮播图的搭建

- 轮播图（van组件库里面的）

- 自定义指示器 

  - 录播图和指示器 这两个所使用的for循环是分开的

    ```javascript
          <van-swipe>
            <template v-for="(item, index) in housePics" :key="index">
              <van-swipe-item>
                <img :src="item.url" alt="">
              </van-swipe-item>
            </template>
    
            <!-- 指示器可以和轮播图分开 -->
            <template #indicator="{ active, total }">
              <div class="custom-indicator" >
                <template  v-for="(value,key,index) in hyHousePics" :key="key">
                    ....
                </template>
              </div>
            </template>
          </van-swipe>
    ```

#### 服务器放回的数据的处理

##### 1.把数据通过不同的值 来分类

```javascript
const hyHousePics = {}
for (const item of props.housePics) {
    let arr = hyHousePics[item.enumPictureCategory]
    if(!arr) {
      hyHousePics[item.enumPictureCategory] = []
      arr = hyHousePics[item.enumPictureCategory]
    }
    arr.push(item)
}
```

- 结果就是生成 {3:Array(6), 5: Array(5), 9:array(3)} 这样的



##### 2. 通过computed对数据处理 记得加 ？否则有些数据服务器没有 或 延迟加载

- const housePics = computed(() => mainPart.value?.topModule?.housePicture?.housePics)
  - 则不用每次使用housePics 都要先输入 mainPart.value?.topModule?.housePicture?.housePics 这么长的数据



##### 3.使用 computed还是 watch 处理的响应式数据

```javascript
const housePics = computed(() => mainPart.value?.topModule?.housePicture?.housePics)
// 出现的问题：console.log(housePics.value)undefined,因为网络请求也在这个页面中
```

- 解决： 通过watch ： 多条代码用watch ， 一条则computed

  ```javascript
  watch(housePics,(newVal) => {...})
  ```

- 要是把housePics传递给子组件，则子组件使用不用watch，但要先判断 如v-if="housePics.length"

  ```javascript
      <Swiper :housePics="housePics" v-if="housePics.length"/>
  ```





##### 4. 使用of遍历，则要数组后可迭代对象

```javascript
// 可以，因为newVal是可迭代对象
// for (const item of newVal) {
//   console.log(item)
// }


// 报错: 因为newVal.enumPictureCategory不是可迭代对象即不是数组， 尽管newVal是
// for (const item of newVal.enumPictureCategory) {
//   console.log(item)
// }
```







# 样式基础知识

- 行内元素不要嵌套块级元素

- 正则表达式的使用

  ```javascript
  const nameReg = /【(.*?)】/i
  const reviseName = (name) => {
    // 方式一
    // return name.replace('【','').replace('】','').replace('：','')
  
    // 方式二
    const results = nameReg.exec(name)
    // console.log(results)
    return results[1]
  }
  ```


- 组件导入是默认导入

  -  即Swiper可以随便修改，Swiper这个组件内部导出是vue底层帮你做了

  ```javascript
  <Swiper ...
  import Swiper from './cpns/detail_01-swiper.vue' -- 即 Swiper你随便写， Swiperrrr 都可以
  ```

  



### 2.5. 描述信息的搭建







### 2.6. detail-section组件







### 2.7. 搭建内容部分

- 设施

- 房东

- 评论

  - 传入组件的数据可以通过`{ } '来变为动态

  ```javascript
  <DetailSection header="热门评论" :more="`查看全部${comments.totalCount}条评论`">
  ```

  - 行内样式绑定全局css

    - 不需要 :color

    ```javascript
    <van-rate color="var(--primary-color)"/>
    ```

    

- 须知



### 样式布局问题

#### 1. justify-content：space-between失效 和 上下两个相同css的div里面的元素排列不齐 

- 原因： div中的.left或.right这个两个子元素 都没未 设置宽度
  - 解决：
  
    - 步骤1： 子元素其中一个设置宽度  
  
    - 步骤2：看情况设置flex：1(子元素.left 或 .right)  或justify-content：space-between（父元素div设置）

![](D:\Desktop\JavaScript\07vue\设施布局.png)

```css
 .facility {
   .content {
      display: flex;
      background-color: rgba(118, 222, 253, 0.1);
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 22%; -- 必须设置width：否则.right占的宽度不同而导致排列不齐，因为.right是flex：1
        padding: 16px;
        gap: 5px;
        img {
          width: 25px;
          height: 25px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-content: center; -- 不是align-item：center；这个属性是对单个元素起作用如（第一个item），而不是多个item
        gap: 7px;
        .item {
          display: flex;
          align-items: center;
          width: 48%;
        }
      }
   } 
  }
```



#### 2.消除最右边line的存在

![](D:\Desktop\JavaScript\07vue\line.png)

```javascript
<template v-for="(item, index) in landlord.hotelTags" :key="index">
              <span :style="{color: item.tagText.color}">{{ item.tagText.text }}</span>
              <span v-if="index !== landlord.hotelTags.length - 1" class="line">|</span>
</template>
```



#### 3.     background-color: var(--theme-linear-gradient)没效果

-    是background-image: var(--theme-linear-gradient);  而不是color





#### 4. 善用gap

- 如上面的line

- 以及

  ![](D:\Desktop\JavaScript\07vue\gap.png)

  ```css
  .comment {
    display: flex;
    flex-direction: column; -- 因为是上下排列，所以要设
    gap: 8px;
    padding: 8px;
  ```

  





#### 5. flex：1、2、3的解释

```javascript
.box
	div1
	div2
	div3
```

- 情况一
  - div都设了flex ：1 则 3个占的空间一样， 当div1改为felx：2，则div1占2/4，其他占1/4
- 情况二
  - 当只有div1设了flex：1，则div1占剩下的所有空间



#### 6. 行内元素不要嵌套块级元素



#### 7. align-content: center;失效情况

```javascript
.title-right {
  display: flex;
  flex-direction: column;
  // align-contents : center; -- 因为你设置了flex-direction导致水平只有一行，而align-content对多行，所以失效
  可以设置align-items：center -- 对此时（因为你设置column）的水平的每一行都设为在中间
  align-item：center -- 是对单一一行，上面是全部
}
```





#### 8. line-height可以调整 长文本导致多行 之间的距离





#### 9. 使用flex布局， 子元素高度先不用管，因为都是由子元素最高那个决定，所以最后再看高度

####  		除非你设置了flex-direction：column， 这是宽度不用管





#### 10. 三个元素排列 ,左边两个（div包裹），右边一个，左边其中一个设置width：百分比（如20%） 而不是数值（如60px）出现的问题 和 解决

```css
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      flex: 1;

	      .title {
    	    width: 20%; ---- 问题所在，因为.right有时因为<div class="right" v-if="item.tips">而消失，导致排列不齐
      	}
          .desc {
            flex:1;
            margin-left: 10px;
     	 }
    }
    .right {
   
     }
  }
```

- 解决方法一（推荐） - width别使用百分比，采用数值，即无论.right有无，宽度始终不变

- 解决方法二 

  - width依旧是百分比， 给.right设置position：absolute，让其脱离标准流，即无论.right有无，宽度始终不变

- 解决方法三： float布局

  ```css
    .content {
      height: 25px;
      line-height:25px;
      .left {
        float: left;
        justify-content: flex-start;
        color: #555;
        font-size: 13px;
        // width: 100%; // 这里不能100%,否则会把right挤到下面去了
        .title {
          float:left;
          width: 60px;
          color: #333; 
        }
        .desc {
          float:left;
          margin-left: 10px;
        }
      }
      .right {
        float: right;
        height: 25px;
      }
    }
  ```

  - 注意百分比使用要小心
    - 比如： 父元素的width没设置百分比，而子元素width设置了，但没什么效果
      - 原因：
        -  子元素的width百分比取决于父元素的width，
        - 而父元素的width因为没设置width使其width大小取决于子元素，从而死循环导致效果失效
  
  
  
  

#### 11. 设置组件内部样式

- :deep(){}

```css
:deep(.custom-content-marker) {
  position: relative;
  width: 80px;
  height: 80px;
}

:deep(.custom-content-marker) #marker-img {
  width: 100%;
  height: 100%;
}

```

- 例子二： 

  - 比如通过浏览器F12 发现是 组件是< div class="van-tabs__wrap"> 。。。< /div >

  - 于是

    ```css
    <van-tabs :class="{'hide-header': !showHeader}"> -- hide-header是自己添加的，一般添加在van-tabs上的属性都是最外层的，所以你可以想下面这样操作
    
    .hide-header :deep(.van-tabs__wrap) {
      opacity: 0;
      pointer-events: none;
      transition: opcity 0.3s;
      height: 0;
    
      /* 优化性能属性 */
    }
    
    /* 显示标签栏 */
    :deep(.van-tabs__wrap) {
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.3s;
    }
    ```

    





### 2.8. 引入百度地图 或 高德地图

- 控制器，创建新项目，密钥， 对应文档





### 2.9. TabControl控制

#### 先写下需求，通过需求看怎么实现

1. 开放一个TabControl

2. 监听滚动

   滚动到一定位置，显示出来

3. 监听TabControl点击，点击后滚动到正确为止





#### 2.9.1. TabControl

- 使用之前封建组件







#### 2.9.2. 控制TabControl的显示

- 监听页面滚动
  - 监听元素的滚动



- 大于300的时候显示

```javascript
<tab-control .....  v-if="showTabControl"/>

const showTabControl = computed(() => scrollTop.value >= 38)
```



### 基础知识： 监听浏览器滚动 和 监听页面滚动 的区别

- 浏览器滚动 
  - **整个浏览器窗口（window）** 的滚动，也就是当页面的内容太多
- 页面滚动 -- 浏览器监听不到
  - 当 `.box` 的内容超出范围时，这个元素就有了**自己的滚动条**。
     此时用户滚动的是 **这个元素内部**，不是整个页面





#### 2.9.3. TabControl的点击 和 v-memo的使用

- 获取组件的根元素的offsetTop, ref绑定函数的方式
- 监听点击: 找到元素, 滚动对应的位置
- 动态的组件的names, 传递给TabControl
- v-memo="[mainPart]">
  - 作用： 只有当 mainPart 这个数据变化，里面的组件才更新

```javascript
     <div class="mainPart" v-if="mainPart" v-memo="[mainPart]">      
          <Swiper :housePics="housePics" v-if="housePics?.length"/>
          <Infos name="简介" :ref="getSectionRefs" :houseInfo="mainPart.topModule"/>
          <Facility name="设施" :ref="getSectionRefs" :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility"/>
          <LandLord name="房东" :ref="getSectionRefs" :landlord="mainPart.dynamicModule.landlordModule"/>
          <Comments name="评论" :ref="getSectionRefs" :comments="mainPart.dynamicModule.commentModule"/>
          <Map name="位置" :ref="getSectionRefs" :position="mainPart.dynamicModule.positionModule" />
          <Notice name="规则" :ref="getSectionRefs" :notices="mainPart.dynamicModule.rulesModule.orderRules"/>
          <PriceIntro name="价格" :ref="getSectionRefs" :introduction="mainPart.introductionModule"/>
     </div>


// 点击tabControl滚动到对应位置
// const sectionRefs = ref([])
//   // 一次获取多个ref方法
// const getSectionRefs = (ref) => {
//   sectionRefs.value.push(ref)
// }
// const itemClick = (index) => {
//   const swiperElement = sectionRefs.value[index].$el
//   window.scrollTo({
//     top: swiperElement.offsetTop - 38,
//     behavior: 'smooth'
//   })
// }
// 优化上面的代码
// tabControl的名字和section的名字对应，且点击tabControl滚动到对应位置
const sectionRefs = ref({})
// names不会因为第一次没有值就报错，因为computed 属性是惰性求值的，这意味着它又获取到值时才会响应式变化
const names = computed(() => {
  return Object.keys(sectionRefs.value) // 返回一个数组，keys而不是key
})

------ 这段代码解释：每个组件挂载时，Vue 会自动调用你写的 ref 函数，并把组件实例传给它；组件卸载时，Vue 会传 null。即--------------getSectionRefs(Infos组件实例)
const getSectionRefs = (ref) => {
  // if判断为了防止组件销毁时，ref为null，然后getAttribute报错
  if(ref) {
    //获取name属性
    const name = ref.$el.getAttribute('name')
    sectionRefs.value[name] = ref
  }
}



const outItemClick = (index) => {
  const name = names.value[index]
  const swiperElement = sectionRefs.value[name].$el
  sectionOffsetTop = swiperElement.offsetTop
  detailRef.value.scrollTo({
    top: swiperElement.offsetTop - 38,
    behavior: 'smooth'
  })
  currentIndex.value = index
}
```





# 基础知识： offsetHeight、offsetTop

- 这些是相对于最临近的 **设了定位元素** 的上级元素







### 3.0 使用van-contribute组件实现 实现tab-control

- 你要是不会使用，就先拆分，比如下面是组件库案例是for循环，你拆分为一个先

```javascript
组件库案例
<van-tabs v-model:active="active" scrollspy sticky>
  <van-tab v-for="index in 8" :title="'标签 ' + index">
    内容 {{ index }}
  </van-tab>
</van-tabs>

使用(因为你不会使用)
<van-tabs v-model:active="active" scrollspy sticky offset-top="0" :show-header="active>0">
    </van-tab>
    <van-tab title="图片">
      <Swiper :housePics="housePics" v-if="housePics?.length"/>
    </van-tab>
    <van-tab title="概述">
      <Infos :houseInfo="mainPart.topModule"/>
    </van-tab>
	。。。。。
</van-tabs>
```



### 3.1 vue中监听数据

- 可以通过computed实现响应式，而不单单是watch

