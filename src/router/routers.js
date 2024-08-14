import TaskPage from "@/pages/TaskPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import SummaryPage from "@/pages/SummaryPage.vue";

const routes =[
    {
        path: '/tasks',
        name: 'tasks',
        component: TaskPage,
    },
    {
        path: '/summary',
        name: 'summary',
        component: SummaryPage,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
    },

]

export default routes;