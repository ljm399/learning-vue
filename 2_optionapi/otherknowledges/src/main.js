import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// 不用加指令周期函数也可以
app.directive('color', 
     (el, bindings) => {
        el.style.color = bindings.value
    
})
app.mount('#app')
