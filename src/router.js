import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Money from './views/Money.vue'
import Login from './views/Login.vue'
import Accounts from './views/Accounts.vue'
import AccountTypes from './views/AccountTypes.vue'
import MoneyTransfers from './views/MoneyTransfers.vue'
import Clients from './views/Clients.vue'
import ProjectTypes from './views/ProjectTypes.vue'
import Projects from './views/Projects.vue'

import Employees from './views/Employees.vue'
import Payments from './views/Payments.vue'
import Discounts from './views/Discounts.vue'
import Currency from './views/Currency.vue'
import AssignEmployeeProject from './views/AssignEmployeeProject.vue'
import FinishedProjects from './views/FinishedProjects.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/account-types',
      name: 'accounttypes',
      component: AccountTypes
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts
    },
    {
      path: '/money',
      name: 'money',
      component: Money
    },
    {
      path: '/money-transfers',
      name: 'moneytransfers',
      component: MoneyTransfers
    },
    {
      path: '/project-types',
      name: 'project-types',
      component: ProjectTypes
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/finished-projects',
      name: 'finished-projects',
      component: FinishedProjects
    },
    {
      path: '/assign-employee-project',
      name: 'assign-employee-project',
      component: AssignEmployeeProject
    },
    
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    },
    {
      path: '/employees',
      name: 'employees',
      component: Employees
    },
    {
      path: '/payments',
      name: 'payments',
      component: Payments
    },
    {
      path: '/discounts',
      name: 'discounts',
      component: Discounts
    },
    {
      path: '/currency',
      name: 'currency',
      component: Currency
    },
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
