

// 异步操作 调用 mutation 里面的方法
export const incrementAction = ({ commit }) => {
  commit('increment')
}
export const decrement = ({ commit }) => {
  commit('decrement')
}

export const incrementIfOdd = ({ commit, state }) => {
  if ((state.count + 1) % 2 === 0) {
    commit('increment')
  }
}

export const incrementAsync = ({ commit }) => {
  setTimeout(() => {
    commit('increment')
  }, 1000)
}
