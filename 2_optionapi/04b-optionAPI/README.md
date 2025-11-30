# Vue 3 系统学习笔记

## 📖 项目简介

这是一个**完整的 Vue 3 学习路径**，从基础到高级，涵盖了 Vue 3 生态系统的各个方面。包括基础语法、Options API、Composition API、Vue Router、状态管理（Vuex/Pinia）、HTTP 请求、高级特性以及响应式原理等内容。

**学习来源**：跟随 [codewhy](https://github.com/coderwhy) 老师系统学习

## 📚 学习路径

### 1️⃣ 基础阶段

#### 1. HTML 中使用 Vue (`1_htmlOfVue`)
- Vue CDN 引入使用
- 基础指令学习（v-if、v-for、v-bind、v-on 等）
- 模板语法和插值表达式
- 计算属性和侦听器
- 基础组件使用

**学习笔记**：`day54.md`

---

### 2️⃣ Options API 阶段 (`2_optionapi`)

#### 2. Vue CLI 项目配置 (`04a-config_ofvue`)
- Vue CLI 项目初始化
- 项目配置文件详解
- webpack 配置优化

#### 3. Options API 核心 (`04b-optionAPI`)
- ✅ 组件嵌套与通信（父子组件、祖先后代）
- ✅ 插槽（Slot）的使用
- ✅ Provide/Inject 依赖注入
- ✅ EventBus 事件总线
- ✅ 生命周期钩子函数
- ✅ ref 获取元素和组件
- ✅ 动态组件与 keep-alive
- ✅ 异步组件
- ✅ v-model 原理与使用
- ✅ Mixin 混入

**学习笔记**：`day55.md`、`day56.md`、`day57.md`

---

### 3️⃣ Composition API 阶段 (`3_compositionapi-setupgrammar`)

#### 4. Composition API 与 setup 语法
- ✅ setup 函数基础
- ✅ reactive 和 ref 响应式数据
- ✅ computed 计算属性
- ✅ watch 和 watchEffect 侦听器
- ✅ 生命周期钩子（Composition API 版本）
- ✅ provide/inject（Composition API 版本）
- ✅ 自定义 Hooks 封装
- ✅ setup 语法糖（`<script setup>`）

**学习笔记**：`day58.md`、`day59.md`

---

### 4️⃣ 路由阶段 (`4_vue-router`)

#### 5. Vue Router 路由管理
- ✅ 路由基础配置
- ✅ 动态路由匹配
- ✅ 嵌套路由
- ✅ 编程式导航
- ✅ 路由守卫（导航守卫）
- ✅ 路由懒加载
- ✅ 路由元信息

**学习笔记**：`day60.md`

---

### 5️⃣ 状态管理阶段

#### 6. Vuex 状态管理 (`5_vuex_d61`)
- ✅ Vuex 核心概念（State、Getters、Mutations、Actions、Modules）
- ✅ 辅助函数（mapState、mapGetters、mapMutations、mapActions）
- ✅ 模块化状态管理
- ✅ Vuex 插件

**学习笔记**：`day61.md`

#### 7. Pinia 状态管理 (`6_pinia_d62`)
- ✅ Pinia 基础使用
- ✅ Store 的定义和使用
- ✅ State、Getters、Actions
- ✅ Pinia vs Vuex 对比

**学习笔记**：`day62.md`

---

### 6️⃣ HTTP 请求阶段 (`7_axios_d62`)

#### 8. Axios 网络请求
- ✅ Axios 基础配置
- ✅ 请求拦截器和响应拦截器
- ✅ 封装 API 请求
- ✅ 错误处理

**学习笔记**：`day62.md`

---

### 7️⃣ 高级特性阶段 (`8_advanced_d67`)

#### 9. Vue 3 高级特性
- ✅ Teleport 传送门
- ✅ Suspense 异步组件
- ✅ 自定义指令
- ✅ 插件开发
- ✅ Render 函数和 JSX
- ✅ Transition 动画
- ✅ 性能优化技巧

**学习笔记**：`day63.md` - `day68.md`

---

### 8️⃣ 原理探索阶段 (`9_principleOfReactive`)

#### 10. Vue 3 响应式原理
- ✅ Proxy 和 Reflect
- ✅ 响应式系统实现原理
- ✅ 依赖收集和触发更新
- ✅ 手写简易响应式系统

---

### 9️⃣ 实战项目 (`hy-trip`)

#### 11. 旅游住宿 Web 应用
- Vue 3 + Vite 完整项目
- 综合应用所学知识
- 项目工程化实践

**项目详情**：查看 [hy-trip/README.md](./hy-trip/README.md)

---

## 🛠️ 技术栈

### 核心技术

- **Vue 3**：渐进式 JavaScript 框架
- **Vue CLI**：Vue 官方脚手架工具
- **Vue Router**：官方路由管理器
- **Vuex / Pinia**：状态管理库
- **Axios**：HTTP 请求库

### 开发工具

- **Vite**：新一代前端构建工具
- **Webpack**：模块打包工具
- **ESLint**：代码规范检查
- **Babel**：JavaScript 编译器

## 📁 目录结构

```
07vue/
├── 1_htmlOfVue/                    # Vue 基础（CDN 引入）
├── 2_optionapi/                    # Options API 学习
│   ├── 04a-config_ofvue/          # Vue CLI 配置
│   ├── 04b-optionAPI/             # Options API 核心
│   └── otherknowledges/           # 其他知识点
├── 3_compositionapi-setupgrammar/  # Composition API
├── 4_vue-router/                   # Vue Router
├── 5_vuex_d61/                     # Vuex 状态管理
├── 6_pinia_d62/                    # Pinia 状态管理
├── 7_axios_d62/                    # Axios 网络请求
├── 8_advanced_d67/                 # Vue 3 高级特性
├── 9_principleOfReactive/          # 响应式原理
├── hy-trip/                        # 实战项目
├── day54.md - day68.md            # 学习笔记
├── install.md                      # 安装说明
└── 常见报错.md                     # 问题解决
```

## 🚀 快速开始

### 环境要求

- Node.js: >=14.0.0
- npm 或 yarn

### 运行基础示例（HTML 版本）

```bash
# 进入基础示例目录
cd 1_htmlOfVue

# 使用 Live Server 打开 HTML 文件
# 或直接双击 HTML 文件在浏览器中打开
```

### 运行 Vue CLI 项目

```bash
# 以 Options API 项目为例
cd 2_optionapi/04b-optionAPI

# 安装依赖
npm install

# 开发环境运行
npm run serve

# 项目将在 http://localhost:8080 启动
```

### 运行实战项目

```bash
# 进入项目目录
cd hy-trip

# 安装依赖
npm install
# 或
pnpm install

# 开发环境运行
npm run dev
```

## 💡 学习建议

### 学习顺序

1. **从基础开始**：先学习 `1_htmlOfVue`，掌握 Vue 的核心概念
2. **深入 Options API**：通过 `2_optionapi` 学习组件化开发
3. **掌握 Composition API**：学习 Vue 3 的新特性
4. **路由和状态管理**：依次学习 Vue Router、Vuex/Pinia
5. **实战演练**：通过 `hy-trip` 项目综合应用
6. **深入原理**：最后学习响应式原理，理解底层实现

### 学习方法

- ✅ **边学边练**：每个知识点都有对应的代码示例
- ✅ **做好笔记**：参考 day54-day68 的学习笔记
- ✅ **实际项目**：通过 hy-trip 项目巩固所学
- ✅ **遇到问题**：查看 `常见报错.md`

## 📚 学习收获

- ✅ Vue 3 完整生态系统的深入理解
- ✅ Options API 和 Composition API 的对比使用
- ✅ 组件化开发思想和最佳实践
- ✅ 路由管理和状态管理方案
- ✅ Vue 3 响应式原理深入理解
- ✅ 前端工程化实践经验
- ✅ 实战项目开发能力

## 📖 参考资料

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vue Router 官方文档](https://router.vuejs.org/zh/)
- [Pinia 官方文档](https://pinia.vuejs.org/zh/)
- [Vuex 官方文档](https://vuex.vuejs.org/zh/)
