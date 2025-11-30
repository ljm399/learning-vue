//要先npm i dayjs 
import dayjs from 'dayjs';
export default function directiveFtime(app) {
  app.directive('ftime', {
    mounted(el, bindings) {
      //1,获取组件的时间
      let timestamp = el.textContent
      if(timestamp.length === 10) {
        timestamp = timestamp * 1000
      }

      //2,获取传入的参数(即用户想要的格式是xx-xx-xx还是xx/xx/xx)
      let value = bindings.value
      if(!value) {
        value = 'YYYY-MM-DD HH:mm:ss'
      }

      //3,格式化时间
      console.log('timestamp', timestamp)//day.js可以是时间戳也可以是时间格式(如:2018-09-05)
      const formatTime = dayjs(timestamp).format(value)
      el.textContent = formatTime
    }
  })
}