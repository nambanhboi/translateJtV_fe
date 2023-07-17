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

export default {
  name: 'App',
  components: {
    Header,
    Footer
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
