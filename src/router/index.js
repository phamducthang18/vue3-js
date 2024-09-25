import {createRouter,createWebHistory} from 'vue-router'
import routes from './routers'
import {useAuthStore} from '../stores/auth'

const router = createRouter({
    routes,
    history: createWebHistory(),
    // linkActiveClass : 'active',
})

router.beforeEach( async(to,from) => {
    
    
    const store = useAuthStore()
    await store.fetchUser(store)
    if (to.meta.auth && !store.isLoggedIn) {
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }

        }
    }else if(to.meta.guest && store.isLoggedIn) {
        return {
            name: 'tasks',
           
        }
    }
})

export default router;