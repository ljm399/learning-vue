export default function directiveUnit(app) {
  app.directive('unit', {
    //el即element的缩写
    mounted(el, bindings) {
      const price = el.textContent
      let unit = bindings.value
      if(!unit) {
        unit = '¥'
      }
      console.log(bindings.value)
      el.textContent = unit + price
    } 
  })
}