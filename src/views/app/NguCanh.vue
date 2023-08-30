<template>
  <div class="list">
    <h1 class="title">
      Câu có cùng ngữ cảnh
    </h1>
    <div v-for="sentence in sentenceList" :key="sentence.id">
        <div class="resutlContent" >
          <div class="resutlImg">
            <img :src="`http://localhost:8000/${sentence.image}`">
          </div>
          <div class="resutlDes">
            <div class="column1">
              <h2><i class="fa-solid fa-headphones" style="margin-right:5px;"
                @click="handleRead(sentence.sentenceJV)"
                ></i>{{ sentence.sentenceJV }}</h2>
              <p style="font-size:1.5rem; margin-bottom:0;">{{ sentence.sentenceVN }}</p>
            </div>
            <div class="column2">
              <div class="comment">
                <router-link :to="{ name: 'detail', params: { id: sentence.id } }">Thảo Luận <i
                    class="fa-regular fa-message"></i></router-link>
              </div>
            </div>
            <div class="column3">
              <div class="column3Left">
                <div class="style"><p>#{{ sentence.style }}</p></div>
                <div class="topic"><p>#{{ sentence.topic }}</p></div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
    
</template>
<script>
import axios from 'axios';
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  setup() {
    const sentenceList = ref([])
    const route = useRoute();
    const id = computed(() => {
      return route.params.id;
    });
    console.log(id.value);
    const getData = async () => {
      await axios.get(`/api/v1/app/ngucanh/${id.value}/`)
      .then(res => {
        console.log(res);
        sentenceList.value = res.data.result;
      })
      .catch((err) => {
        console.log(err)
      })
    };
    getData();

    const handleRead = (sentenceJV) => {
            console.log(sentenceJV);
            const msg = new SpeechSynthesisUtterance();
            msg.lang = 'ja';
            msg.text = sentenceJV;
            window.speechSynthesis.speak(msg);
        };


    return {
      sentenceList,
      getData,
      id,
      route,
      handleRead
    }
  }
})
</script>

<style scoped>

.list {
  width: 70%;
  margin-left: 25%;
  margin-bottom: 80px;
}

.title {
  margin: 50px 0 50px 15%;
  color: #4e9a9a;
}

.resutlContent{
  display: flex;
  margin: 20px 0;
}

.resutlImg{
  width: 25%;
  height: 20vh;
  overflow: hidden;
  object-position: center;
}
.resutlImg img{
  width: 100%;
  height: 100%;
}

.column1,
.column2,
.column3{
  margin-left: 1rem;
}
.column2{
  margin-top: 1rem;
}
.column2,.column3Left{
  display: flex;
}


.detail,
.comment {
  border: 1px solid black;
  display: flex;
  justify-content: center;
}


.detail p,
.comment p {
  margin: 0;
  padding: 5px 10px;

}

.detail {
  text-decoration: none;
  color: black;
}


.comment:hover {
  cursor: pointer;
  background-color: #ff2798;
}

.comment a:hover {
  color: #fff !important;

}

.comment a {
  line-height: 34px;
  padding: 0 20px;
  color: #000;
  text-decoration: none;
}


</style>