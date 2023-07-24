import {createStore} from 'vuex'

export default createStore({
    state: {
        token: '',
        isAuthenticated: false
        // isLoggedIn: false,
        // username: '',
    },
    mutations: {
        initializeStore(state){
            if( localStorage.getItem('token')){
                state.token + localStorage.getItem('token')
                state.isAuthenticated = false
            }
            else{
                state.token='';
                state.isAuthenticated = false
            }
        },
        setToken(state,token){
            state.token = token
            state.isAuthenticated = true
        },
        removeToken(state){
            state.token = '';
            state.isAuthenticated = false
        },
        // login(state,usernam){
        //     state.isLoggedIn = true.
        //     state.username = username
        // }
    },
    actions:{

    },
    modules: {
        
    }
})