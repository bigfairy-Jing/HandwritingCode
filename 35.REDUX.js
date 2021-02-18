function createStore(reducer, enhancer) {
  // 先处理 enhancer
  // 如果enhancer存在并且是函数，我们将createStore 作为参数传给他
  // 返回一个新的createStore
  // 再拿这个新的createStoer执行，应该得到一个Store, 返回Store

  if (enhancer && typeof enhancer === 'function') {
    const newCreateStore = enhancer(createStore)
    const newStore = newCreateStore(reducer)
    return newStore
  }

  let state, listeners = []

  function subscribe(cb) {
    listeners.push(cb)
  }

  function dispatch(action) {
    state = reducer(state, action)

    for (let i = 0; i < listeners.length; i++) {
      const listeners = listeners[i]
      listeners()
    }
  }

  function getState() {
    return state
  }

  return {
    subscribe,
    dispatch,
    getState
  }

}