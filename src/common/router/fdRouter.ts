// [import] Libraries
import { createRouter, createWebHistory } from 'vue-router'
// [import] Screens
import homeScreen from '@screen/home';
// [create] Create router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'home', component: homeScreen},
        {path: '/login', name: 'login', component: () => import('@screen/login')}
    ]
})
export default router;
