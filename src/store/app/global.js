const global = {
  state: {
    controlss: []
  },
  mutations: {
    SET_CONTROLS: (state, token) => {
      state.token = token
    }
  },
  actions: {
    setControls ({ commit }, values) {
      console.log(values)
      this.state.controlss = values
    },
    getControls ({ commit }) {
       return this.state.controlss
    }
  }
}

export default global
