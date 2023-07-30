<template>
  <Header />
    <router-view/>
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
      console.log(response.data)
      console.log(this.users)

    })
    .catch((error) => {
      console.log(error);
    })
  },
    beforeCreate(){
    this.$store.commit('initializeStore')
    const username = this.$store.state.username
    if(username){
      axios.defaults.headers.common['Authorization'] = 'username' + username
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

