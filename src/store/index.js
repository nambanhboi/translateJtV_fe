import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        token: '',
        isAuthenticated: false,
        isLoggedIn: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        username: null,
        sentence: null
    },
    mutations: {
        initializeStore(state){
            if( localStorage.getItem('username')){
                state.username + localStorage.getItem('username')
                state.isAuthenticated = false 
            }else{
                state.username='';
                state.isAuthenticated = false
            }
            
        },
        setToken(state,username ){
            state.username= username
            state.isAuthenticated = true
        },
        removeToken(state){
            state.token = '';
            state.isAuthenticated = false
        },
        SET_LOGIN(state){
            state.isLoggedIn = true;
        },
        SET_LOGOUT(state){
            state.isLoggedIn = false;
            state.user = null;
            state.username = null
            state.accessToken = null
        },
        setSentence(state,sentencePayload){
            state.sentence = sentencePayload
        },
        setUsername(state,sentencePayload){
            state.username = sentencePayload
        }
    },
    actions:{
        async login({commit},credentials){
            try{
                const response = await axios.post('/api/v1/app/login',credentials,{
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                console.log(response.data, commit)
                // const username = response.data.auth_token
                // commit('setToken',username)
                // axios.defaults.headers.common['Authorization'] = 'username' + username
                // localStorage.setItem("username",username)
                // const user = response.data;
                // commit('SET_LOGIN',user)
                // console.log(credentials)

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
    },
    modules: {
        
    },
    getters:{
        getAccessToken: state => state.accessToken,
        getRefreshToken: state => state.refreshToken,
        isLoggedIn: state => state.isLoggedIn,

    }
})