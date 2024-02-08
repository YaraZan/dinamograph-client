import {Home, Login, Registration, Predict, Config, Settings} from "@/pages";
import {createRouter, createWebHistory} from "vue-router";
import {encryptStorage} from "@/utils/storage.js";
import Versions from "@pages/config/partials/Versions.vue";
import Datasets from "@pages/config/partials/Datasets.vue";
import Markers from "@pages/config/partials/Markers.vue";

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
            },
        ],
        beforeEnter: (to, from, next) => {
            const ud = encryptStorage.getItem('ud');
            if (ud.role !== 'admin' ) next({ name: from.name })

            if (to.name === 'config') {
                next({ name : 'config.versions'});
            } else {
                next();
            }
        },
        meta: { requiresAuth: true } },
    { path: '/settings', name: 'settings', component:  Settings, meta: { requiresAuth: true } }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

const isAuthorized = () => {
    const ud = encryptStorage.getItem('ud');
    const at = encryptStorage.getItem('at');

    return ud !== undefined && ud.role !== undefined && at !== undefined
}

router.beforeEach((to, from, next) => {
    if (!isAuthorized() && to.name !== 'login') {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;