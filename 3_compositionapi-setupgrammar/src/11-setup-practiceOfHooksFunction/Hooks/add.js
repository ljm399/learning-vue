import { ref } from 'vue'
export default function  add() {
  const counter = ref(0)
  function add() {
    counter.value++
  }
  //tip提示:函数要放在setup函数里面,相当于用了created生命周期函数
  setTimeout(() => {
    counter.value =999
  }, 1000);
  return {
    counter,
    add
   }
}