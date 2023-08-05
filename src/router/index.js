import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/app/Home.vue"),
        // meta:{requiresAuth: true}
    },
    {
        path: "/report",
        name: "report",
        component: () => import("../views/app/ReportTest.vue"),
    },
    {
        path: "/admin/paragraph_list",
        name: "paragraph_list",
        component: () => import("../views/admin/ParagraphList.vue"),
    },
    {
        path: "/admin/paragraph_list/:id/sentence_list",
        name: "sentence_list",
        component: () => import("../views/admin/SentenceList.vue"),
        props: true
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/app/logIn.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/app/register.vue"),
    },
    {
        path: "/detail/:id",
        name: "detail",
        component: () => import("../views/app/detail.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to,from,next)=>{
    const isLoggedIn = function checkUserLoggedIn() {
        // Lấy trạng thái isLoggedIn từ Vuex store
        const isLoggedIn = this.$store.getters.isLoggedIn;
      
        // Trả về giá trị của trạng thái isLoggedIn
        return isLoggedIn;
      }
    if(to.meta.requiresAuth && !isLoggedIn){
        next('/login');
    }
    else{
        next();
    }
})
export default router;
