export default function directiveFocus(app) {
  app.directive('focusa', {
    //el即element的缩写
    mounted(el) {
      el.focus()
    }
  })
}