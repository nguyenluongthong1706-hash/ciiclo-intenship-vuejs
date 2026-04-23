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

const routes = [
    {
        'path' :'/',
        'component': DefaultLayout,
        'children' : [
            {
                'path': '',
                'component': Homepage
            },
            {
                'path': '/profile',
                'component': Profile
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
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router