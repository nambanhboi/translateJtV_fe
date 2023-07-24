<template>
  <div class="container" style="margin-top: 2rem">
    <h1 style="margin-bottom: 1rem">Kết Quả:</h1>
    <div v-for="sentence in sentenceList" v-bind:key="sentence.id">
      <div class="resutlContent">
        <div class="resutlImg">
          <img :src="sentence.image" width="100%"/>
        </div>
        <div class="resutlDes">
          <div class="column1">
            <h2><i class="fa-solid fa-headphones"
               style="margin-right:5px;"
              @click="handleRead(sentence.sentenceJV)"
               ></i>{{ sentence.sentenceJV }}</h2>
            <p style="font-size:1.5rem; margin-bottom:0;">{{ sentence.sentenceVN }}</p>
          </div>
          <div class="column2">
            <div class="detail">
              <p>
                Xem toàn bộ ngữ cảnh
                <i class="fa-solid fa-up-down-left-right"></i>
              </p>
            </div>
            <div class="comment">
              <router-link :to="{name:'detail',params:{id:sentence.id} }" >Thảo Luận <i class="fa-regular fa-message"></i></router-link>
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
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="fa-solid fa-triangle-exclamation"></i> Báo Cáo
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        <i class="fa-solid fa-triangle-exclamation"></i> Báo Cáo
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <!-- body -->
                      <div class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                          Báo cáo lỗi sai của câu
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <li><a class="dropdown-item" href="#" type="button">Dịch sai nghĩa tiếng Việt</a></li>
                          <li><a class="dropdown-item" href="#" type="button">Sai ngữ pháp</a></li>
                          <li><a class="dropdown-item" href="#" type="button">Lỗi khác</a></li>
                        </ul>
                      </div>

                      <div class="dropdown" style="margin-top:5px;">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                          Đóng góp câu mới
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <li>
                            <form action="">
                              <input type="text" placeholder="nhập câu tiếng Nhật" style="padding:5px 10px; border-radius:15px;">
                              <br>
                              <input type="text" placeholder="nhập câu tiếng Việt tương ứng" style="margin-top:5px; padding:5px 10px; border-radius:15px;">
                                <br>
                              <button type="button" class="btn btn-dark">Gửi</button>
                            </form>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style="margin: 15px 0" />
    </div>
    
  </div>
</template>

<script>

export default {
  name: "resultSearch",
  props:['sentenceList'],
  setup() {
    const handleRead = (sentenceJV) => {
      console.log(sentenceJV)
      const msg = new SpeechSynthesisUtterance();
      msg.lang = 'ja'
      msg.text = sentenceJV;

      window.speechSynthesis.speak(msg)
    }

    return {
      handleRead
    }
  }

  methods: {
    btn_comment(){
      console.log('hiển thị rồi nè')
    }
  },
};
</script>

<style scoped>
.resutlContent {
  display: flex;
}

.resutlImg {
  width: 35%;
  height: 30vh;
  overflow: hidden;
  object-position: center;
}
.resutlImg img {
  width: 100%;
}
.resutlDes{
  width: 65%;
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