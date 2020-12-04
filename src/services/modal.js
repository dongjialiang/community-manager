import { watchEffect } from 'vue'
import createStore from '../store'

const store = createStore()

export default () => {
  const modalAction = (fn, msg, item) => {
    store.setModalMsg(`确定执行${msg}操作吗?`)
    const stop = watchEffect(() => {
      const action = store.state.modalAction
      if (action) {
        fn(item)
        store.setModalAction(null)
        stop()
      } else if (action === false) {
        store.setModalAction(null)
        stop()
      }
    })
  }

  return { modalAction }
}
