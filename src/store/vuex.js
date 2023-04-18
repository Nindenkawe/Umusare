import Vuex from 'vuex'
/* import {getApi} from '../axios-api' */
import axios from 'axios'


export default new Vuex.Store({
  state:{
    accessToken: null,
    refreshToken: null,
    Userinfo: ''
  },
  mutations:{
    updatestorage (state,{access,refresh}){
      state.accessToken = access
      state.refreshToken = refresh

    },
  },
  actions:{
    userLogin(context, usercredentials){
      return new Promise((resolve,reject)=>{
        axios.post('/api/token',{
          username: usercredentials.username,
          password: usercredentials.password
        })
        .then(response => {
          context.commit('updateStorage',{access:response.data.access, refresh: response.data.refresh})
          resolve()
        })
      })
    }
  }
})