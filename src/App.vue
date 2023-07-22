<template>
  <Header :users="users" />
    <router-view :users="users"/>
  <Footer />
</template>

<script>
import Header from './layouts/Header.vue';
import Footer from './layouts/Footer.vue';
import axios from 'axios';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      users: [],
    }
  },

  methods: {
    created(){
    axios
    .get('/api/v1/users/')
    .then((response) =>{
      this.users = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
  },
    beforeCreate(){
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if(token){
      axios.defaults.headers.common['Authorization'] = 'Token' + token
    }
    else{
      axios.defaults.headers.common['Authorization'] = ''
    }
    }
  }
  
}
</script>

<style>
.router {
  color: #000;
}

</style>

