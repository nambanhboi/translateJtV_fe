<template>
  <div class="container">
    <div class="logIn">
    <!-- Pills navs -->
    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li class="nav-item" role="presentation">
        <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="./login" role="tab"
          aria-controls="pills-login" aria-selected="true">Đăng Nhập</a>
      </li>
      <li class="nav-item" role="presentation">
        <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="./register" role="tab"
          aria-controls="pills-register" aria-selected="false">Đăng Ký</a>
      </li>
    </ul>
    <!-- Pills navs -->

<!-- Pills content -->
    <div class="tab-content">
      <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
        <form @submit.prevent="submitForm">
          <div class="text-center mb-3">
            <p>Đăng nhập với:</p>
            <button type="button" class="btn btn-link btn-floating mx-1 icon-fb">
              <i class="fab fa-facebook-f"></i>
            </button>

            <button type="button" class="btn btn-link btn-floating mx-1 icon-gg">
              <i class="fab fa-google"></i>
            </button>
          </div>

          <p class="text-center">Hoặc:</p>

          <!-- Email input -->
          <div class="form-outline mb-4">
            <label class="form-label" for="loginName">Tên người dùng</label>
            <input type="text" id="loginName" class="form-control" placeholder="Nhập tên người dùng" v-model="username"/>
          </div>
          

          <!-- Password input -->
          <div class="form-outline mb-4">
            <label class="form-label" for="loginPassword">Mật khẩu</label>
            <input type="password" id="loginPassword" class="form-control" placeholder="Nhập mật khẩu" v-model="password"/>
          </div>

          <!-- 2 column grid layout -->
          <div class="row mb-4">
            <div class="col-md-6 d-flex justify-content-center">
              <!-- Checkbox -->
              <div class="form-check mb-3 mb-md-0">
                <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                <label class="form-check-label" for="loginCheck"> Lưu mật khẩu </label>
              </div>
            </div>

            <div class="col-md-6 d-flex justify-content-center forget-password">
              <!-- Simple link -->
              <a href="#!">Quên mật khẩu?</a>
            </div>
          </div>

          <!-- Submit button -->
          <button type="submit" class="btn btn-primary btn-block mb-4 btn-login" @click="submitForm">Đăng Nhập</button>

          <!-- Register buttons -->
          <div class="text-center">
            <p>Bạn chưa là thành viên của <router-link to="/" class="logo-login">betoni</router-link>? <a href="/register">Đăng ký</a></p>
          </div>
        </form>
      </div>

    </div>
<!-- Pills content -->
  </div>
  </div>

</template>


<script>
import axios from 'axios'
// import jwt_decode from 'jsonwebtoken';

// import axios from "axios";

export default {
    name: 'login-',
    data() {
      return {
        username: '',
        password: '',
      }
    },

    // mounted() {
    //    this.submitForm();
    // },
    methods: {
      async submitForm(){
        const formData ={
          username:  this.username,
          password:  this.password,
        }
      //   axios
      //   .post('/api/v1/token/login',{ username: this.username, password: this.password })
      //   .then((response) => {
      //     // Xử lý phản hồi thành công
      //     console.log(response.data)
      //     localStorage.setItem('username',response.data.username)
      //     const token = response.data.auth_token
      //     this.$store.commit('setToken',token)
      //     axios.defaults.headers.common['Authorization']= 'Token' + token
      //     localStorage.setItem('token',response.data.token)
      //     localStorage.setItem("username", this.username);
      //     console.log('username')
      //     this.$router.push('/')

      //   })
      //   .catch((error) => {
      //     // Xử lý lỗi
      //     console.error(error);
      //   });
      // }
      //this.$store.dispatch('login',{username: this.username, password :this.password})
      await axios.post('/api/v1/app/login/', formData)
      .then((res)=>{
        console.log(res)
        const accessToken = res.data.access_token
        const refreshToken = res.data.refresh_token
        console.log(accessToken, refreshToken)

        //lưu accesstoken và refreshtoken, username(lấy từ formdata luôn) vào store

        this.$router.push('/')
      //  localStorage.setItem("username", this.username);
      //  console.log(this.username)

      })
      .catch(error=>{
        console.error(error)
        console.log('Lỗi rồi đăng nhập!')
      })
    },
  }
}
</script>

<style scoped>
.router {
  color: #000;
}


.logIn{
  margin-top: 150px;
  padding-top: 35px;
  background-color: #e3e3e3;
}

.nav-pills{
  margin: 0 7rem;

}

.nav-pills .nav-link{
  width: 80%;
  background-color: #fff;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  border-radius: 3px;
}

.nav-link.active{
  background-color: #fc0d76 !important;
  font-size: 18px;
  font-weight: 600;
  border-radius: 3px;
}

.nav-item:first-child{
  margin-right: 50px;

}

button.btn.btn-link.btn-floating.mx-1{
  background-color: pink;
  border-radius: 25px;
}

.icon-fb{
  padding: 8px 15px !important;
}

.icon-gg{
  padding: 8px 12px !important;
}

button.btn.btn-link.btn-floating.mx-1 i{
  color: #fc0d76;
  font-size: 25px !important;

}

.form-outline.mb-4 {
    display: flex;
    justify-content: space-between;
    margin: 0 25px;
}

.form-outline.mb-4 input{
  font-style: italic;
  font-size: 16px;
  width: 80%;
}

.row.mb-4 {
    margin: 0 20px;
}

.forget-password{
  justify-content: right !important;

}

.btn-login {
  width: 50%;
  margin-left: 310px;
  background-color: #fc0d76 !important;
  font-size: 18px;
  font-weight: 600;
  border-radius: 3px;
  border: none;
}

.logo-login{
  color: #fc0d76;
  font-weight: 600;
  text-decoration: none;
}

.text-center{
  padding-bottom: 20px;
}
</style>