import {Home, Login, Registration, Predict, Config, Settings} from "@/pages";
import {createRouter, createWebHistory} from "vue-router";
import {encryptStorage} from "@/utils/storage.js";

const routes = [
    { path: '/', name: 'home', component:  Home },
    { path: '/login', name: 'login', component:  Login },
    { path: '/registration', name: 'registration', component:  Registration },
    { path: '/predict', name: 'predict', component:  Predict, meta: { requiresAuth: true } },
    { path: '/config', name: 'config', component:  Config, meta: { requiresAuth: true } },
    { path: '/settings', name: 'settings', component:  Settings, meta: { requiresAuth: true } }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})


export default router;