import {Home, Login, Registration} from "@/pages/index.js";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    { path: '/', name: 'home', component:  Home },
    { path: '/login', name: 'login', component:  Login },
    { path: '/registration', name: 'registration', component:  Registration }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;