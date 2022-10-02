import { createRouter, createWebHistory } from 'vue-router'
import Math from '../views/Math.vue'
import Review from '../views/Review.vue'
import Converter from '../views/DayToHour.vue'
import NotFound from '../views/NotFound.vue'
import Huay from '../views/Huay.vue'
const history = createWebHistory()
const routes = [
    {
         path: '/',
         name: 'Math',
         component: Math
    },
    {
        path: '/review',
        name: 'Review',
        component:Review
    },
    {
        path: '/daytohour',
        name: 'Converter',
        component: Converter
    },
    {
        path: '/randomHuay',
        name: 'huay',
        component: Huay
    },
    {
        path: '/:catchNotMatchPath(.*)',
        name: 'PathNotFound',
        component:NotFound
    }
]

const router = createRouter({history, routes})

export default router