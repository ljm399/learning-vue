import { ref, watch } from 'vue'
export default function useTitle( titelValue ) {
  //1,函数非optionApi里面是默认响应式(要考虑是不是响应式),其他都要想变响应式才能更改template中的数据(比如标题就是template里面)
  const titleValue = ref( titelValue )
  
  //2,watch监听titleValue,一旦变化就更新document.title,否则useTitle就执行一次,导致docment.title不更新
  // 所以document.title = titelValue没效果
  watch( titleValue, ( newValue ) => {
    document.title = newValue
  } )

  //warming报错:return返回:这不能少,因为你调用到setup函数,而这规定要return,否则就用optionApi但无法抽离复用,要是是html加js那vue就没什么意义了
  return titleValue
}