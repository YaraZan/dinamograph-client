import {Home, Login, Registration, Ai, Config} from "@/pages";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    { path: '/', name: 'home', component:  Home },
    { path: '/login', name: 'login', component:  Login },
    { path: '/registration', name: 'registration', component:  Registration },
    { path: '/ai', name: 'ai', component:  Ai },
    { path: '/config', name: 'config', component:  Config }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;