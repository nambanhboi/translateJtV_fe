<template>
  <div style="min-height:61vh;">
    <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6" style="display:flex;">
        <input type="text" 
        class="form-control" 
        placeholder="Search..." 
        v-model="searchQuery"
        />
        <button type="button" class="btn btn-dark" @click="search">Search</button>
      </div>
      <!-- giao diện tam giác style, topic -->
      <div class="filter">
    <!-- Example split danger button -->
    <div class="btn-group">
      <button type="button" class="btn btn-warning btn-sm">Phong Cách</button>
      <button
        type="button"
        class="btn btn-warning dropdown-toggle dropdown-toggle-split btn-sm"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu">
        <div v-for="style in styleList" v-bind:key="style.id">
          <li><a class="dropdown-item" @click="filterStyle(style)">{{ style.style }}</a></li>
        </div> 
        
      </ul>
    </div>

    <div class="btn-group" style="margin-left:1rem;">
      <button type="button" class="btn btn-warning btn-sm">Chủ Đề</button>
      <button
        type="button"
        class="btn btn-warning dropdown-toggle dropdown-toggle-split btn-sm"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu">
        <div v-for="topic in topicList" v-bind:key="topic.id">
          <li><a class="dropdown-item" @click="filterTopic(topic)">{{ topic.topic }}</a></li>
        </div>  
      </ul>
    </div>
  </div>
    </div>
  </div>
  <resultSearch :sentenceList = "sentenceList"></resultSearch>
  </div>
</template>
  
<script>
import resultSearch from "../../components/resultSeach.vue"
import axios from "axios";

export default {
  name: "Home-",
  data() {
    return {
      searchQuery: "",
      sentenceList: [],
      topicList: [],
      styleList: [],
    };
  },

  components: { 
    resultSearch,
  },

  mounted() {
    this.getTopicList();
    this.getStyleList();
  },

  methods: {
    search() {
      axios
      .get(`/api/v1/app/sentence_list/?search=${this.searchQuery}`)
      .then((response) => {
          this.sentenceList = response.data;
        })
      .catch((error) => {
          console.log(error);
        });
    },

    getTopicList() {
      axios
      .get('/api/v1/app/sentence_list/')
      .then((response) => {
          this.topicList = response.data;
        })
      .catch((error) => {
          console.log(error);
        });
    },

    getStyleList() {
      axios
      .get('/api/v1/app/sentence_list/')
      .then((response) => {
          this.styleList = response.data;
        })
      .catch((error) => {
          console.log(error);
        });
    },

    filterTopic(topic) {
      axios
      .get(`/api/v1/app/sentence_list/?search=${this.searchQuery},${topic.topic}`)
      .then((response) => {
          this.sentenceList = response.data;
        })
      .catch((error) => {
          console.log(error);
        });
    },

    filterStyle(style) {
      axios
      .get(`/api/v1/app/sentence_list/?search=${this.searchQuery},${style.style}`)
      .then((response) => {
          this.sentenceList = response.data;
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
    margin-top: 2rem;
  }

  .filter {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}
</style>
  