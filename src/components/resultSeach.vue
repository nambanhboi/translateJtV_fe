<template>
  <div class="container">
    <h1 style="margin-bottom:1rem;">Kết Quả:</h1>
    <div v-for="sentence in sentenceList" v-bind:key="sentence.id">
      <div class="resutlContent">
        <div class="resutlImg">
          <img :src="sentence.image" >
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
            <div class="comment">
              <router-link to="/detail/:id">Thảo Luận <i class="fa-regular fa-message"></i></router-link>
            </div>
          </div>
          <div class="column3">
            <div class="column3Left">
              <div class="style"><p>#{{ sentence.style }}</p></div>
              <div class="topic"><p>#{{ sentence.topic }}</p></div>
            </div>
            <div class="column3Right">
              <p><i class="fa-solid fa-triangle-exclamation"></i> Báo Cáo</p>
            </div>
          </div>
        </div>
      </div>
      <hr style="margin:15px 0;">
      
    </div>
    
  </div>
</template>

<script>

export default {
  name: "resultSearch",
  props:['sentenceList'],

  methods: {
    btn_comment(){
      console.log('hiển thị rồi nè')
    }
  },
};
</script>

<style scoped>

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
}

.comment a:hover{
  color: #fff !important;

}

.comment a{
  line-height: 34px;
  padding: 0 20px;
  color: #000;
  text-decoration: none;
}


</style>