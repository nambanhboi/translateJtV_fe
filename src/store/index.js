import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    isLoggedIn: false,
    accessToken: null,
    username: null,
    sentence: null,
    user:null,
    comments: null,
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
      //localStorage.setItem('token', accessToken)
    },

    setId(state,user)
    {
      state.user = user.id;
      localStorage.setItem('user', user.id)
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

    setComments(state, comments) {
      state.comments = comments;
      localStorage.setItem('comments', comments);
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
        console.log(response.data.id)
        commit('setToken', accessToken);
        commit('setId', JSON.stringify(response.data.user))
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        commit('SET_LOGIN', username);

      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    checkLoggedIn({commit}){
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            commit("SET_LOGIN",user)
        }
    },
    logout({ commit }) {
      commit('clearToken');
      commit('SET_LOGOUT');
    },

    async fetchSentence({ commit }, id) {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/app/sentence_list/${id}`);
        const data = res.data;
        commit('setSentence', data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    fetchComments(description) {
      axios.get(`http://127.0.0.1:8000/api/v1/app/comment/`) // Điều chỉnh URL tương ứng
        .then(response => {
          description.commit('setComments', response.data);
          console.log('comment list nè')
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    },

  },
  modules: {},
  getters: {
    getAccessToken: state => state.accessToken,
    isLoggedIn: state => state.isLoggedIn,
    username: state => state.username,
    getUserId: state => state.user ? state.user.id : null,
    getComments: state => state.comments,
  }
});
