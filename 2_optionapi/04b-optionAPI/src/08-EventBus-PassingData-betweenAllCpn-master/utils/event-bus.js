//PassingData传递数据,之前有父与子之间(export和import),父和子与孙之间(provide和inject)

//要是不是父子也不是祖辈之间,用EventBus事件总线(全局事件总线)
//原理:组件把要传递的数据,通过事件总线传递给全局事件总线,全局事件总线再把数据传递给组件
import { HYEventBus } from 'hy-event-store'//hy-event-store是私人的包(之后学到前面再去封装,npm install hy-event-store)

const eventBus = new HYEventBus()//创建事件总线

export default eventBus






  

 