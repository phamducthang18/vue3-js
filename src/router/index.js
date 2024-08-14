import {createRouter,createWebHistory} from 'vue-router'
import routes from './routers'

export default createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass : 'active',
})