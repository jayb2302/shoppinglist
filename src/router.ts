// router.js (or router.ts for TypeScript)
import { createRouter, createWebHistory } from 'vue-router';

import UserLogIn from './components/UserLogIn.vue'; // Import your views/components
import Home from './components/HelloWorld.vue'; // Import your views/components
import UserRegister from './components/UserRegister.vue'; // Import your views/components

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: UserRegister,
    },
    { 
        path: '/login',
        name: 'UserLogIn',
        component: UserLogIn,
    }
    ,
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
