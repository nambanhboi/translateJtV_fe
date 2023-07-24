<template>
    <div class="show-comments">
      <h1>hello</h1>
      <div class="container-comments" >
        <div class="resutlContent" >
          <div class="resutlImg">
            <img :src=" sentence.image" >
          </div>
          <div class="resutlDes">
            <div class="column1">
              <h2><i class="fa-solid fa-headphones" style="margin-right:5px;"></i>{{  sentence.sentenceJV }}</h2>
              <p style="font-size:1.5rem; margin-bottom:0;">{{  sentence.sentenceVN }}</p>
            </div>
            <div class="column2">
              <div class="detail">
                <p>Xem toàn bộ ngữ cảnh <i class="fa-solid fa-up-down-left-right"></i></p>
              </div>
            </div>
            <div class="column3">
              <div class="column3Left">
                <div class="style"><p>#{{ sentence.style }}</p></div>
                <div class="topic"><p>#{{  sentence.topic }}</p></div>
              </div>
              <div class="column3Right">
                <p><i class="fa-solid fa-triangle-exclamation"></i> Báo Cáo</p>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <form >
          <div class="list-comments">
            <div class="input-comment">
              <input type="text" id="comment" class="form-control" placeholder="Nhập bình luận" v-model="description" />
              <button type="submit" class="btn-comment" >Bình Luận</button>
            </div>
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

import axios from "axios";
// import { onMounted } from 'vue'

import { defineComponent } from "vue"

    
  export default defineComponent({
    name: "detail-",
    props: ['id'],
    data() {
      return {
        sentence: [],
      }
    },
    mounted() {
     
    },
    // mounted((id) => {
    //   // const sentence = ref({})
    //   // axios.get(`/api/v1/app/sentence_list/${id}`)
    //   .then((response) => {
    //   // sentence.value = data.sentenceList[0] || {}
    //   this.sentence = response.data
    // })
    // }),
    setup(props){
      axios.get(`/api/v1/app/sentence_list/${props.id}`)
      return {

      }
    }
  })
  </script>
  
<style scoped>
.show-comments .container-comments {
    margin: 126px 200px;
    background-color: #fff;
    padding: 20px 0px;
}

.show-comments .resutlContent{
  justify-content: center;

}
.input-comment {
    display: flex;
    margin: 0 50px;
}


.resutlContent{
  display: flex;
}

.resutlImg{
  width: 25%;
  height: 25vh;
  overflow: hidden;
  object-position: center;
}
.resutlImg img{
  width: 100%;
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
.comment{
  border: 1px solid black;
  display: flex;
  justify-content: center;
}
.comment{
  margin-left: 1rem;
}

.detail p,
.comment p{
  margin: 0;
  padding:5px 10px ;
}

.column3{
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
}

.comment:hover{
  cursor: pointer;
  background-color: #ff2798;
  color: #fff;
}


</style>
  

