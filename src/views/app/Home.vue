<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="Search..." />
        </div>
      </div>
    </div>
    <div v-for="sentence in sentence_list" v-bind:key="sentence.id">
      <h2>{{ sentence.sentenceJV }}</h2>
      <h3>{{ sentence.sentenceVN }}</h3>
      <p>{{ sentence.style }}</p>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import axios from "axios";
  
  export default {
    name: "Home-",
    data() {
      return {
        sentence_list: [],
      };
    },
    components: {},
  
    mounted() {
       this.getSentence_list();
    },
  
    methods: {
      getSentence_list() {
        axios
          .get("/api/v1/admin/sentence_list/")
          .then((res) => JSON.stringify(res))
          .then((Response) => {
            console.log(Response);
            this.sentence_list = Response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  input {
    border: 1px solid black;
  }
  .container {
    margin-top: 5rem;
  }
  </style>
  