<template>
  <div class="show-comments">
    <div class="container-comments" v-if="sentence">
      <div class="resutlContent">
        <div class="resutlImg">
          <img :src="sentence.image">
        </div>
        <div class="resutlDes">
          <div class="column1">
            <h2><i class="fa-solid fa-headphones" style="margin-right:5px;"></i>{{ sentence.sentenceJV }}</h2>
            <p style="font-size:1.5rem; margin-bottom:0;">{{ sentence.sentenceVN }}</p>
          </div>
          <div class="column2">
            <div class="detail">
              <p>Xem toàn bộ ngữ cảnh <i class="fa-solid fa-up-down-left-right"></i></p>
            </div>
          </div>
          <div class="column3">
            <div class="column3Left">
              <div class="style">
                <p>#{{ sentence.style }}</p>
              </div>
              <div class="topic">
                <p>#{{ sentence.topic }}</p>
              </div>
            </div>
            <div class="column3Right">
              <p><i class="fa-solid fa-triangle-exclamation"></i> Báo Cáo</p>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <form>
        <div class="list-comments">
          <form class="input-comment" @submit.prevent="submitComment">
            <input type="text" id="comment" class="form-control" placeholder="Nhập bình luận" v-model="description" />
            <button type="submit" class="btn-comment" @click="submitComment">Bình Luận</button>
          </form>
          <!-- <div class="display-cmts">
              {{users.username}}  
              {{comments.description}} 
            </div> -->
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { mapGetters } from 'vuex';

import axios from 'axios';
export default {
  name: 'detail-',
  data() {
    return {
      description: ''
    }
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    store.dispatch("fetchSentence", route.params.id);
    console.log(route.params.id)
    return {
      sentence: computed(() => store.state.sentence),
    }
  },
  created() {
    this.$store.commit('initializeStore');
  },
  computed: {
    sentenceVN() {
      return this.$store.state.sentence.id;
    },
    username() {
      return this.$store.state.username;
    },
    ...mapGetters(['getAccessToken'])
  },

  methods: {
    submitComment() {
      const Comment = {
        description: this.description,
        sentence: this.sentenceVN,
        user: this.username,
      };
      try {
        const res = axios.post('api/v1/app/comment', Comment, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getAccessToken}`
          }
        })
        console.log(res)
        console.log('Comment thành công!')

      }
      catch (err) {
        console.log(err)
        console.log('Comment lỗi!')

      }
    }
  }
}

</script>
  
<style scoped>
.show-comments .container-comments {
  margin: 126px 200px;
  background-color: #fff;
  padding: 20px 0px;
}

.show-comments .resutlContent {
  justify-content: center;

}

.input-comment {
  display: flex;
  margin: 0 50px;
}


.resutlContent {
  display: flex;
}

.resutlImg {
  width: 25%;
  height: 25vh;
  overflow: hidden;
  object-position: center;
}

.resutlImg img {
  width: 100%;
}

.column1,
.column2,
.column3 {
  margin-left: 1rem;
}

.column2 {
  margin-top: 1rem;
}

.column2,
.column3Left {
  display: flex;
}

.detail,
.comment {
  border: 1px solid black;
  display: flex;
  justify-content: center;
}

.comment {
  margin-left: 1rem;
}

.detail p,
.comment p {
  margin: 0;
  padding: 5px 10px;
}

.column3 {
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
}

.comment:hover {
  cursor: pointer;
  background-color: #ff2798;
  color: #fff;
}</style>
  

