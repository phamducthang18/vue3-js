import TaskPage from "@/pages/TaskPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import SummaryPage from "@/pages/SummaryPage.vue";
import NotFounfErrorPage from "@/pages/errrors/NotFounfErrorPage.vue";
import HomePage from "@/pages/HomePage.vue";
import Chat from "@/pages/Chat.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import Game from "@/pages/Game.vue";

const routes =[
    {
        path: '/',
        name: 'home',
        component: HomePage,
       
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: TaskPage,
        // meta: {
        //     auth: true,
        // },
    },
    {
        path: '/summary',
        name: 'summary',
        component: SummaryPage,
        meta: {
            auth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta :{
            guest : true,
        }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta :{
            guest : true,
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
        meta: {
            auth: true,
        }
    },
    {
        path: '/chat',
        name: 'chat',
        component:Chat ,
       
    },
    {
        path: '/game',
        name: 'game',
        component: Game,
        meta: {
            auth: true,
        }
    },
    {
        path: '/:notFound(.*)',
        name: 'error.404',
        component: NotFounfErrorPage,
    },

]

export default routes;