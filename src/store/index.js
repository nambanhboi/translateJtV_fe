import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        // token: '',
        // isAuthenticated: false,
        isLoggedIn: false,
        user: null,
    },
    mutations: {
        // initializeStore(state){
        //     if( localStorage.getItem('token')){
        //         state.token + localStorage.getItem('token')
        //         state.isAuthenticated = false 
        //     }else{
        //         state.token='';
        //         state.isAuthenticated = false
        //     }
            
        // },
        // setToken(state,token){
        //     state.token = token
        //     state.isAuthenticated = true
        // },
        // removeToken(state){
        //     state.token = '';
        //     state.isAuthenticated = false
        // },
        SET_LOGIN(state,user,username){
            state.isLoggedIn = true;
            state.user = user
            state.username = username
        },
        SET_LOGOUT(state){
            state.isLoggedIn = false;
            state.user = null;
            state.username = null
        }
    },
    actions:{
        async login({commit},credentials){
            try{
            const response = await axios.post('/api/v1/token/login',credentials)
                const user = response.data
                    // username: response.data.username
            
                commit('SET_LOGIN',user)
                localStorage.setItem('user',JSON.stringify(user))
            }catch(error){
                console.error(error)
                throw error
            }
        },
        logout({commit}){
            commit('SET_LOGOUT')
            localStorage.removeItem('user')
        },
        checkLoggedIn({commit}){
            const user = JSON.parse(localStorage.getItem('user'))
            if(user){
                commit("SET_LOGIN",user)
            }
        },
    },
    modules: {
        
    },
    getters:{
        isLoggedIn: state => state.isLoggedIn,
        user: state =>state.user,
        username: (state) => (state.user ? state.user.username : null),
    }
})