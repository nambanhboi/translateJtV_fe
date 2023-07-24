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
            <h2>
              <i class="fa-solid fa-headphones" style="margin-right: 5px"></i
              >{{ sentence.sentenceJV }}
            </h2>
            <p style="font-size: 1.5rem; margin-bottom: 0">
              {{ sentence.sentenceVN }}
            </p>
          </div>
          <div class="column2">
            <div class="detail">
              <p>
                Xem toàn bộ ngữ cảnh
                <i class="fa-solid fa-up-down-left-right"></i>
              </p>
            </div>
            <div class="comment">
              <router-link to="/sentence_list/:id">Thảo Luận <i class="fa-regular fa-message"></i></router-link>
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
                    <div class="modal-body modal-bd1" ref="modalBd1">
                      <!-- body1 -->
                      <div class="form-check">
                        <input class="btn-check" type="radio" name="baocao" id="flexRadioDefault1" value="report" v-model="selectedRadio"/>
                        <label class="btn btn-secondary" for="flexRadioDefault1" style="font-size:1.5rem;"> Báo cáo lỗi sai của câu </label>
                      </div>

                      <!-- Default checked radio -->
                      <div class="form-check">
                        <input class="btn-check" type="radio" name="baocao" id="flexRadioDefault2" value="contribute" v-model="selectedRadio" />
                        <label class="btn btn-secondary" for="flexRadioDefault2" style="font-size:1.5rem;"> Đóng góp câu mới </label>

                      </div>

                      
                    </div>

                    <div class="modal-body modal-bd2" v-if="selectedRadio ==='report'">
                      <!-- body2 -->
                      <hr>
                      <div class="form-check ">
                        <input class="form-check-input" type="radio" name="report" id="flexRadioDefault3" value="dịch sai nghĩa tiếng việt" v-model="report"/>
                        <label class="form-check-label" for="flexRadioDefault1" style="font-size:1.5rem;">dịch sai nghĩa tiếng việt</label>
                      </div>

                      <!-- Default checked radio -->
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="report" id="flexRadioDefault4" value="Sai ngữ pháp" v-model="report"/>
                        <label class="form-check-label" for="flexRadioDefault2" style="font-size:1.5rem;">Sai ngữ pháp</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="report" id="flexRadioDefault4" value="Lỗi khác" v-model="report"/>
                        <label class="form-check-label" for="flexRadioDefault2" style="font-size:1.5rem;">Lỗi khác</label>
                      </div>
                      <button type="button" class="btn btn-primary" @click="submitReport">Gửi</button>
                    </div>

                    <div class="modal-body modal-bd3" v-if="selectedRadio ==='contribute'">
                      <!-- body2 -->
                      <hr>
                      <form action="" class="formInModal">
                        <input type="text" name="" placeholder="Câu tiếng nhật" v-model="contributeJ">
                        <input type="text" name="" placeholder="Câu tiếng Việt tương ứng" v-model="contributeV">
                        <button type="button" class="btn btn-primary" >Gửi</button>
                      </form>
                      
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
import axios from 'axios';
// import axios from "axios";
export default {
  name: "resultSearch",
  props:['sentenceList'],
  data() {
    return {
      selectedRadio: "",
      report:"",
      contributeJ: "",
      contributeV: "",
    }
  },

  methods: {
    submitReport() {
      axios
      .post('/api/v1/app/Report/', {
        TypeName : this.report,
        // User: 
      })
      .then(function () {
        alert('thành công!');
        console.log(this.report);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
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
/* modal */
.formInModal{
  display: grid;
}

.formInModal input{
  padding: 5px 10px;
  border-radius: 10px;
  margin-bottom: 5px;
}
</style>