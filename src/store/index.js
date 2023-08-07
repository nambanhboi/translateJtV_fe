import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    isLoggedIn: false,
    accessToken: null,
    username: null,
    sentence: null,
    user:null
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
    setId(state,user)
    {
      state.user = user;
      localStorage.setItem("user", user)
    },

    clearToken(state) {
      state.accessToken = null;
      localStorage.removeItem('token')
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
        commit('setId', response.data.user)
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
    username: state => state.username,
    getUserId: state => state.user ? state.user.id : null,
  }
});
