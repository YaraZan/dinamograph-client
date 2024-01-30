import {Home, Login, Registration, Predict, Config, Settings} from "@/pages";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    { path: '/', name: 'home', component:  Home },
    { path: '/login', name: 'login', component:  Login },
    { path: '/registration', name: 'registration', component:  Registration },
    { path: '/predict', name: 'predict', component:  Predict },
    { path: '/config', name: 'config', component:  Config },
    { path: '/settings', name: 'settings', component:  Settings }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;