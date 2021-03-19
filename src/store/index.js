import { createStore } from 'vuex'

export default createStore({
  state: {
    name: 'Gowtham Name HEllo INdex'
  },
  getters: {
    getName: state => {
      console.log('getName', state.name);
      return state.name;
    }
  },
  mutations: {
    changeName(state, name) {
      console.log('Change name', name)
      state.name = name;
    }
  },
  actions: {
  },
  modules: {
  }
})
