import { computed } from "vue";
import { useStore, mapState } from "vuex";

export default function useState(mapper) {
  const store = useStore()
  const stateObj = mapState(mapper)
  const newState = {}
  Object.keys(stateObj).forEach(key => {
    newState[key] = computed( stateObj[key].bind({ $store: store }))
  })
  return newState
}