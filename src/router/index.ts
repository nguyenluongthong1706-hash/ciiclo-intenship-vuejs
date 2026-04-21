import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Homepage from '@/views/HomePage.vue'
import Profile from '@/views/Profile.vue'

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
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router