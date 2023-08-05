<template>
    <div class="container">
      <h1>report page is here</h1>
      <input type="text" v-model="typeName">
      <input type="text" name="" id="" v-model="description">
      <button @click="handleSubmit">nộp</button>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import { mapGetters } from 'vuex';

  export default {
    name: "Report-",
    data() {
      return {
        typeName: '',
        description: ''
      }
    },
    computed: {
      ...mapGetters(['getAccessToken'])
    },
    methods: {
      handleSubmit() {
        const values = {
          typeName: this.typeName,
          description: this.description,
        }
        try
        {
          const res = axios.post('api/v1/app/report', values, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.getAccessToken}`
            }
          })
          console.log(res)
        }
        catch(err) {
          console.log(err)
        }

      }
    }
  };
  </script>
  
  <style scoped></style>
  