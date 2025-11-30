import { mapGetters, useStore } from 'vuex'
import { computed } from 'vue'
export default function useGetters(mapper) {//mapper翻译为映射器
  const store = useStore()
  const gettersObj = mapGetters(mapper)
  const newObj = {}
  Object.keys(gettersObj).forEach(key => {
    newObj[key] = computed( gettersObj[key].bind({ $store: store}))
  })
  return newObj
}