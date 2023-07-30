<template>
    <div class="container">
        <div class="register">
        <!-- Pills navs -->
        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link " id="tab-login" data-mdb-toggle="pill" href="./login" role="tab"
                aria-controls="pills-login" aria-selected="true">Đăng Nhập</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link active btn-alternative" id="tab-register" data-mdb-toggle="pill" href="./register" role="tab"
                aria-controls="pills-register" aria-selected="false">Đăng Ký</a>
            </li>
        </ul>
        <!-- Pills navs -->

        <div class="tab-content">
            <div class="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                <form @submit.prevent="submitForm">
                <div class="text-center mb-3">
                    <p>Đăng ký với:</p>
                    <button type="button" class="btn btn-link btn-floating mx-1 icon-fb">
                        <i class="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1 icon-fb">
                    <i class="fab fa-google"></i>
                    </button>
                </div>

                <p class="text-center">Hoặc:</p>

                <!-- Name input -->
                <!-- <div class="form-outline mb-4">
                    <label class="form-label" for="registerName">Tên</label>
                    <input type="text" id="id_username" class="form-control" placeholder="Nhập tên" v-model="user" />
                </div> -->

                <!-- Username input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="registerUsername">Tên người dùng</label>
                    <input type="text" id="registerUsername" class="form-control" placeholder="Nhập tên người dùng" v-model="username" />
                </div>

                <!-- Email input -->
                <!-- <div class="form-outline mb-4">
                    <label class="form-label" for="registerEmail">Email</label>
                    <input type="email" id="registerEmail" class="form-control" placeholder="Nhập email" v-model="email" />
                </div> -->

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="registerPassword">Mật khẩu</label>
                    <input type="password" id="registerPassword" class="form-control" placeholder="Nhập mật khẩu" v-model="password" />
                </div>


                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                    <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                    aria-describedby="registerCheckHelpText" />
                    <label class="form-check-label" for="registerCheck">
                    Tôi đã đọc và đồng ý với các điều khoản
                    </label>
                </div>

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-3 btn-register" @click="submitForm">Đăng ký</button>
                <div class="text-center">
                    <p>Bạn đã có tài khoản thành viên <router-link to="/" class="logo-login">betoni</router-link>? <a href="/login">Đăng nhập</a></p>
                </div>
                </form>
            </div>
        </div>
    </div>
    </div>

</template>
<script>
import axios from 'axios';
export default {
    name: 'register-',
    data() {
      return {
        username: '',
        password: '',
      }
    },
    mounted() {
       this.submitForm();
    },
    methods: {
      submitForm(){
        const credentials ={
          username: this.username,
          password: this.password,
        };
        axios.post('http://127.0.0.1:8000/api/v1/app/user/',credentials)
        .then(response =>{
          console.log('Đăng ký thành công!',response.data)
          this.$router.push('/login')
        })
        .catch(error => {
          console.error(error)
          console.log("đăng ký lỗi rồi")
        })
      }
    },
}
</script>

<style scoped>
.router {
  color: #000;
}

.register{
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

.btn-alternative{
    color: #fff !important;
}

.btn-register {
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