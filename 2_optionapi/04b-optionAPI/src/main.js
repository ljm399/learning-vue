import { createApp } from 'vue'
// import App from './01-cpn-nesting-IP/App.vue'
// import App from './02-cpnImport-fatherImportSon-IP/App.vue'
// import App from './03-cpnExport-sonExportFather-IP/App.vue'
// import App from './04-pratical-tabControl-IP/App.vue'
// import App from "./05-slot-basicUse-master/App.vue"
// import App from './06-slot-scopeSlotARenderingScope-master/App.vue'
// import App from './07-day5-cpnImport-provideAInject-betweenAncestors-NIP/App.vue'
// import App from './08-EventBus-PassingData-betweenAllCpn-master/App.vue'
// import App from './09-lifeCycle-lifeCycleFunction-IP/App.vue'
// import App from './10-ref-getElementACpn-master/App.vue'
// import App from './11-dynamicCpn-NIP/App.vue'
// import App from './12-keep-alive-understand/App.vue'
// import App from './13-asynCpn-NIP/App.vue'
// import App from './14-v-model-NIP/App.vue'
import App from './15-mixin-NIP/App.vue'

//createApp(App)返回的是个对象,当你要使用这个对象是可以
// const app = createApp(App)
// app.mount('#app')

//asyn异步打包(非组件)
//Promise 会解析为该模块导出的内容，这些内容被赋值给 res
// import('./13-asynCpn/explain').then( res => {
//   res.sum(20, 30)
// })

//mixins:全局:所有组件都会使用这个混入配置
const app = createApp(App)
app.mixin({
  created() {
    console.log('i am global mixin')
  }
})

app.mount('#app')

