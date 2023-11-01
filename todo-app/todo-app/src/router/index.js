import {createRouter, createWebHistory } from 'vue-router';
import RegisterAccount from '../components/RegisterAccount.vue';
import LandingPage from '../components/LandingPage.vue';
import SignIn from '../components/SignIn.vue';
import CreateCategory from '../components/CreateCategory.vue'
import addTask from '../components/addTask.vue'
import HomePage from '../components/HomePage.vue'
import TaskSchedule from '../components/TaskSchedule.vue'

export default createRouter({
    //remove the hash for dev (createWebHashHistory)
    history: createWebHistory(),
    routes:[
    {
        path:'/',
        name:'Home',
        component: HomePage
    },
        
    {
        path:'/Landing',
        name:'Landing',
        component: LandingPage
    },
    {
        path:'/register',
        name:'Register',
        component: RegisterAccount
    },
    {
        path:'/signin',
        name:'Signin',
        component: SignIn
    },
    {
        path:'/createCategory',
        name:'CreateCategory',
        component: CreateCategory
    },
    {
        path:'/addTask',
        name:'AddTask',
        component: addTask
    },
    {
        path:'/schedule',
        name:'TaskSchedule',
        component: TaskSchedule
    }
]
});