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
        path: "/admin/sentence_list",
        name: "sentence_list",
        component: () => import("../views/admin/SentenceList.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
