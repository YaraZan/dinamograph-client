import {Home, Login, Registration, Predict, Config, Settings} from "@/pages";
import {createRouter, createWebHistory} from "vue-router";
import {encryptStorage} from "@/utils/storage.js";
import Versions from "@pages/config/Partials/Versions.vue";
import Datasets from "@pages/config/Partials/Datasets.vue";
import Markers from "@pages/config/Partials/Markers.vue";

const routes = [
    { path: '/', name: 'home', component:  Home },
    { path: '/login', name: 'login', component:  Login },
    { path: '/registration', name: 'registration', component:  Registration },
    { path: '/predict', name: 'predict', component:  Predict, meta: { requiresAuth: true } },
    { path: '/config', name: 'config', component:  Config,
        children: [
            {
                path: 'versions',
                name: 'config.versions',
                component: Versions
            },
            {
                path: 'datasets',
                name: 'config.datasets',
                component: Datasets
            },
            {
                path: 'markers',
                name: 'config.markers',
                component: Markers
            }
        ],
        meta: { requiresAuth: true } },
    { path: '/settings', name: 'settings', component:  Settings, meta: { requiresAuth: true } }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
    if (to.name === 'config') {
        next({ name : 'config.versions'});
    } else {
        next();
    }
});

export default router;