import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Homepage from '@/views/HomePage.vue'
import Profile from '@/views/Profile.vue'
import  AdminLayout from '@/layouts/AdminLayout.vue'
import DashBoard from '@/views/DashBoard.vue'
import UserManagement from '@/views/UserManagement.vue'
import PostManagement from '@/views/PostManagement.vue'
import CategoryManagement from '@/views/CategoryManagement.vue'
import NotFound from '@/views/NotFound.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
    {
        'path' :'/',
        'component': DefaultLayout,
        'children' : [
            {
                'path': '',
                'component': Homepage,
                'meta': {requiresAuth: false}
            },
            {
                'path': 'profile',
                'component': Profile,
                'meta' : {requiresAuth: true}
            }
        ]
    },
    {
        'path' : '/auth',
        'component' : AuthLayout,
        'children' : [
            {
                'path' : 'login',
                'component' : Login
            },
            {
                'path' : 'register',
                'component' : Register
            }
        ]
    },
    {
        'path': '/admin',
        'component' : AdminLayout,
        'meta' : {requiresAuth: true, role: "ADMIN"},
        'children' : [
            {
                'path' : 'dashboard',
                'component' : DashBoard
            },
            {
                'path' : 'user',
                'component' : UserManagement
            },
            {
                'path' : 'post',
                'component' : PostManagement
            },
            {
                'path' : 'category',
                'component' : CategoryManagement
            },
        ]
    },{
        'path' : '/:path(.*)*',
        'component' : NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next)=>{
    const authStore = useAuthStore()
    const user = authStore.user

    if(to.meta.requiresAuth && !user){
        return next('/auth/login')
    }

    if(to.meta.role && user?.role !== to.meta.role){
        return next('/')
    }

    next()
})

export default router