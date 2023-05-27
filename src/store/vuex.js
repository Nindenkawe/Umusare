import Vuex from 'vuex'
import { getAPI } from '../axios-api'

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    userInfo: ''
  },
  mutations: {
    updateStorage(state, { access, refresh }) {
      state.accessToken = access
      state.refreshToken = refresh
    },
  },
  actions: {
    userLogin({ commit }, userCredentials) {
      return new Promise((resolve, reject) => {
        // Make a POST request to the Django server to authenticate the user
        getAPI.post('/api/token/', {
          username: userCredentials.username,
          password: userCredentials.password
        })
        .then(response => {
          // Update the store with the access and refresh tokens received
          commit('updateStorage', {
            access: response.data.access,
            refresh: response.data.refresh
          })
          resolve()
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  }
})
