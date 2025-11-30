/*  vuex状态管理库的concept概念 
  安装:npm install vuex --save
  然后cli的package.json中的dependencies会有"vuex": "^x.x.x",


 其他:vue课程1,vue的核心语法,2,路由,3,vuex和pinia状态管理
  vuex->pinia难度降低,但vue2->vue3,难度升高
  所有新的技术都是为了解决旧技术的缺点(了解)


一,不叫数据而是状态,理由:
   1,数据是变化的,状态是不变的(如data=[1,2]显示了的1是状态,而2,未显示是数据)
   2,二者都可以称呼,但状态更合适

二,状态管理:即把使用了的数据管理起来,如vuex(了解)
  一起学到总线,和vuex作用相同,但vuex更强大
  vuex可以处理复杂的状态,如服务器返回的数据,缓存数据,用户产生的数据等

三,vuex思想以及pinai思想:(了解)
  3.1,为了解决的problem:一个状态的变化引起多个状态的变化,难以控制和追踪
  3.2,vuex思想:把多个状态放在一个对象里面,强制性的规则来维护视图和状态之间的独立性

四,vuex的操作步骤
  stata的数据->各组件->action(异步操作)->mutation(同步操作)->影响state的数据

五,vuex和全局对象区别:
  1,vuex里存储的数据是响应式的
  2,不能直接修改store的数据,唯一的路径是提交(commit)mutation

六,vuex使用的是单一状态树
  1,单一状态树:即用一个对象就包含了全部的应用层级状态(了解),
  采用的ssot(single source of truth)翻译为单一源文件
  但这与module模块不冲突
  每个vuex只有一个store(可以但不符合规定,要多个就用pinia),store储存着state(状态)

  2,优势:方便管理和维护
  
七,除state是函数(箭头),其他都是对象
  由于getters是对state的数据进行修改,本质也是拿到数据,所有使用时是在computed因为返回的是函数
  而actions和mutations操作,所以是methoeds

八,页面数据的两种设计方案
  从服务器拿到数据
  const banner = ref([])
  const recommend = ref([])

  1,放在对应组件里面
  2,从服务器拿到数据放在vuex里面(推荐)
*/

