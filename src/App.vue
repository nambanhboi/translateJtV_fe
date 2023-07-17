<template>
  <Header />
    <div class="view_main">
      <router-view />
    </div>
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
    Footer
  },
  methods: {
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
  *{
    margin: 0;
    padding: 0;
  }
  .view_main{
    min-height: 70vh;
  }
</style>
