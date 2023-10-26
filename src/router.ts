// router.js (or router.ts for TypeScript)
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        //component: Home,
        component: () => import('./views/MyFrontPage.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        //component: UserRegister,
        component: () => import('./components/UserRegister.vue'),
    },
    { 
        path: '/login',
        name: 'UserLogIn',
       // component: UserLogIn,
        component: () => import('./components/UserLogIn.vue'),
    },
    { 
        path: '/shoppinglist',
        name: 'ShoppingList',
        component: () => import('./components/ShoppingList.vue'),
    }
    // Add more routes here as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
