// [import] Libraries
import { createRouter, createWebHistory } from 'vue-router'
// [import] Screens
import homeScreen from '@screen/home';
// [IMPORT] Children
import guidePages  from './home/fdRouter.guide';
import puzzlePages from './home/fdRouter.puzzle';
// [create] Create router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', name: 'home', component: homeScreen, children: [
            {path:'', name:'homePage', component: () => import('@page/home')},
            ...guidePages, ... puzzlePages
        ]},
        {path: '/login', name: 'login', component: () => import('@screen/login')}
    ]
})
export default router;
