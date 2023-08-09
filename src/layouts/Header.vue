<template>
    <nav
    class="navbar navbar-expand-lg navbar-scroll shadow-0 border-bottom border-dark">
    <div class="container">
      <div class="logo">
        <router-link to="/" class="router">
            <h6>Từ điển song ngữ Việt - Nhật</h6>
            <h1>betoni</h1>
        </router-link>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <i class="fas fa-bars btn-admin" ></i>

            <router-link to="/" class="router"
              ><strong>Trang Chủ</strong></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/paragraph_list" class="router"
              ><strong>Quản lý đoạn</strong></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/sentence_list" class="router"
              ><strong>Quản lý câu</strong></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/report" class="router"><strong>Báo Cáo</strong></router-link>
            <i class="fa-solid fa-user" @click="togglDisplay"></i> 
              <div class="logOut" :style="{display:showLogOut ? 'block' : 'none'}" @click="logout">Đăng xuất</div>
              <div class="loggedIn" v-if="isLoggedIn" >
                <p>{{ username }}</p>
              </div>
              <div class="logIn-register" v-else>
                <router-link to="/login" class="nav-logIn" >Đăng Nhập</router-link>/ <router-link to="/register" class="signUp">Đăng Ký</router-link>
              </div>
          </li>
        </ul>
      </div> 
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Header-',
    data() {
      return {
        showLogOut: false
      }
    },
    created() {
      // Gọi phương thức initializeStore để khởi tạo giá trị username từ localStorage
      this.$store.commit('initializeStore');
      console.log(this.$store.state.username);
    },
    computed: {
      ...mapGetters(['isLoggedIn']),
      username() {
        return this.$store.state.username;
      },
    },

    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      },
      togglDisplay() {
        this.showLogOut = !this.showLogOut;
      }
    },
};
</script>
<style>

.logOut{
  position: absolute;
    top: 73px;
    border: 1px solid #fff;
    background-color: pink;
    color: #fff;
    padding: 5px 10px;
    left: 1284px;
}
/* Color of the navbar BEFORE scroll */
.fa-user:hover{
  cursor: pointer;
}
.navbar-scroll {
  background-color: #fff;
}

/* Color of the navbar AFTER scroll */
.navbar-scrolled {
  background-color: #ffffff;
}

.router {
  color: rgb(255, 255, 255);
  text-decoration: none;
}
.router-link-exact-active {
  margin: 0 1rem;
  text-decoration: none;
  color: black;
}

.nav-item {
  display: flex;
  align-items: center;
}

*{
  font-family: 'Nunito', sans-serif;
}

.logo h1{
  text-align: center;
  color: #f86f87;
  font-weight: 600;
  font-size: 3rem;
}

.logo h6{
  margin-bottom: 0;
  margin-top: 8px;
  font-weight: 600;
  font-size: 18px;
}

.nav-logIn ,
.signUp{
  text-decoration: none;
  color: #000;
}

.router-link-exact-active{
  margin: 0 !important;
}

.btn-admin{
  margin-right: 35px;
  font-size: 20px;
}
</style>
