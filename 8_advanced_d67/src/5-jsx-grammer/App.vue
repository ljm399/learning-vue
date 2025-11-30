<script setup>
//#region 了解jsx语法
  /* 
    jsx语法,因为你使用render函数和h函数来创建虚拟DOM太麻烦
    jix有配置babel插件来解析jsx语法,使其转化为h函数调用

    babel其他作用:
    1,将es6代码转化为es5
    2,将jsx语法转化为h函数调用
    3,将ts语法转化为js
    前面所学的template直接使用,是vue-loader解析的,不是babel

    使用条件:
    1,cli:安装jsx插件,同时配置到babel中(npm i @vue/babel-plugin-jsx -D)
    vite中则npm i @vitejs/plugin-vue-jsx -D

    2,cli到其babel.config.js配置好plugins:['@vue/babel-plugin-jsx']
    vite中则到vite.config.js配置:
    import vueJsx from '@vitejs/plugin-vue-jsx'
    export default defineConfig({
      plugins: [vueJsx()],
    })
    
  */
//#endregion

import Op from './optionapi.vue'
import Cp from './optionapi.vue'
</script>

<template>
  <div class="app">
    <p>optionAPi中使用</p> 
    <Op />
    <hr>
    <p>setup中使用</p>
    <Cp />
  </div>
</template>


<style scoped>

</style>