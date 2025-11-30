import { ref } from "vue";
export default function useCounter() {
  const counter = ref(0)
  function add() {
    counter.value++

    //当数据不是响应式数据时,测试用clg,因为js里面的数据变化了
    console.log('counter')
  }

  function sub() {
    counter.value--
  }
  return {
    counter,
    add,
    sub,
  }
}