import { ref } from "vue";
export default function scrollWatch() {
  const scrollPosition = ref({
    x : 0,
    y : 0
  })

  // 监听窗口滚动事件。
  // 由于窗口滚动是浏览器 DOM 事件，并非 Vue 的内置响应式数据源，
  // 因此我们使用 addEventListener 来捕获滚动行为。
  // 然后将滚动位置 (scrollX, scrollY) 保存到一个 ref 对象中，
  // 这样它就变成了响应式数据，可以在组件中被安全地使用和监听。
  addEventListener("scroll", () => {
    scrollPosition.value.x = window.scrollX;
    scrollPosition.value.y = window.scrollY;
  });
  

  return scrollPosition
}