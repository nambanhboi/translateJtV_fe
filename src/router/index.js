import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/app/Home.vue"),
    },
    {
        path: "/report",
        name: "report",
        component: () => import("../views/app/Report.vue"),
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
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
