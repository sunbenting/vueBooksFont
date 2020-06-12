import Vue from 'vue'
import Vuex from 'vuex'
import {UserInfo} from '@/api/home';
import { getInfo } from '@/utils/jsfunc';
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
      pcid:'',
      userinfo:{}
  },
  mutations: {
    getpcid (state,payload) {
      state.pcid=payload;
      // localStorage.setItem('pcid',payload);    
      console.log('state.pcid :>> ', state.pcid);
    },
    getUserinfo(state,payload){
      state.userinfo=payload;
      // localStorage.setItem('userinfo',JSON.stringify(payload));
      console.log('store---userinfo :>> ', state.userinfo);
    }
  },
  actions:{
  async  getpcidAsync ({ commit }){
      const res=await UserInfo();
      const obj=getInfo(res);
      commit('getpcid',obj.ID);
      commit('getUserinfo',obj)
    }
  }
  
})

export default store
