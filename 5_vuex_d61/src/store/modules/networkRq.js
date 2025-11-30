const newworkRq = {
  namespaced: true,
  state: () => ({
    // 服务器数据
    data: []
  }),
  mutations: {
    //网络请求
    changeData(state, data) {
      console.log(data)
      state.data = data
    }
  },
  actions: {
    networkRequest(context) {
      return new Promise((resolve, reject) => {
          fetch('http://123.207.32.32:8000/home/multidata').then(res => {
            return res.json()
          }).then(data => {
            console.log('测试')
            context.commit('changeData', data.data.banner.list)
            resolve('网络请求成功')
          })
          .catch(err => {
            reject('网络请求失败')
          })
        })

      }
  }
}
export default newworkRq