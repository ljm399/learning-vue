const counter = {
  namespaced:false,
  
  state: () => ({
    counters: 1,
    payLoad : ''
  }),
  getters: {
    douleCounters(state,getters,rootState) {
      return state.counters * 2 + rootState.count
    },
  },
  mutations: {
    increament(state, payload) {
      state.counters++,
      state.payLoad = payload,
      console.log(state.payLoad + 'counter.js的Mutations的increament')
    }
  },
  actions: {
    increamentAction(context,payload) {
      context.commit('increament',payload)
    },
    //action的六个参数
    sixArgAction({commit,state,getters,rootState,dispatch,rootGetters}) {
      //当使用这个参数,则不用context.commit
      commit('increament','counter.js/actions/sixArgAction来commit给  ')
      commit('changeName', 'counter.js/actions/sixArgAction来commit给  ', {root:true})

      console.log('模块的state',state.counters)
      console.log('root的state',rootState.count)
      console.log('模块的getters',getters.douleCounters)
      console.log('root的getters',rootGetters.doubleCount)

      //当使用这个参数,则不用context.dispatch
      dispatch('increamentAction','counter.js/actions/sixArgAction来dispatch给  ')
      //dispatch给root的action传值
      dispatch('changeNameAction','counter.js/actions/sixArgAction来dispatch给  ',{root:true})


    }
  }

  
}
export default counter