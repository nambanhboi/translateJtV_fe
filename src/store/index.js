import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    isLoggedIn: false,
    accessToken: null,
    username: null,
    sentence: null
  },
  mutations: {
    initializeStore(state) {
      const storedUsername = localStorage.getItem('username');
      const storedisLoggedIn = localStorage.getItem('isLoggedIn')
      state.username = storedUsername || '';
      state.isLoggedIn = storedisLoggedIn || '';
    },
    setToken(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem('token', accessToken)
    },
<<<<<<< HEAD
    actions:{
        async login({commit},credentials){
            try{
                const response = await axios.post('/api/v1/app/login',credentials,{
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                const username = response.data.auth_token
                commit('setToken',username)
                // axios.defaults.headers.common['Authorization'] = 'username' + username
                localStorage.setItem("username",username)
                const user = response.data;
                commit('SET_LOGIN',user)
                console.log(credentials)

            }catch(error){
                console.error(error)
                throw error
            }
        },
        
        logout({commit}){
            localStorage.removeItem('access_token');
            commit('SET_LOGOUT')
            localStorage.removeItem('user')
        },
        checkLoggedIn({commit}){
            const user = JSON.parse(localStorage.getItem('user'))
            if(user){
                commit("SET_LOGIN",user)
            }
        },

        async fetchSentence({commit},{ id }){
            const res = await axios.get("http://127.0.0.1:8000/api/v1/admin/sentence_list" + '/'+ id+ '/')
            const data = await res.data
        
            commit("setSentence",data)
        },

        async getUsername({commit},{id}){
            const res = await axios.get("http://127.0.0.1:8000/api/v1/app/user"+ '/'+ id+ '/')
            const data = await res.data
        
            commit("setUsername",data)
        },
=======
    clearToken(state) {
      state.accessToken = null;
      localStorage.removeItem('token')
>>>>>>> 927f5bd75e542dff74c67aef87f8ce071198d34c
    },
    SET_LOGIN(state, username) {
      state.isLoggedIn = true;
      state.username = username;
      localStorage.setItem('username', username);
      localStorage.setItem('isLoggedIn', true)
    },
    SET_LOGOUT(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.accessToken = null;
      localStorage.removeItem('username');
      localStorage.setItem('isLoggedIn', false);
    },
    setSentence(state, sentencePayload) {
      state.sentence = sentencePayload;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/v1/app/login', credentials, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const username = response.data.user.username;
        const accessToken = response.data.token.access;
        commit('setToken', accessToken);
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        commit('SET_LOGIN', username);

      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    logout({ commit }) {
      commit('clearToken');
      commit('SET_LOGOUT');
    },

    async fetchSentence({ commit }, id) {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/admin/sentence_list/${id}`);
        const data = res.data;
        commit('setSentence', data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
  modules: {},
  getters: {
    getAccessToken: state => state.accessToken,
    isLoggedIn: state => state.isLoggedIn,
    username: state => state.username
  }
});
