import { createRouter, createWebHistory } from 'vue-router'
import { navigation } from '../config/navigation'

const routes = [
  {
    path: '/',
    redirect: '/introduction'
  },
  {
    path: '/introduction',
    name: 'introduction',
    component: () => import('../views/Introduction.vue')
  },
  {
    path: '/installation',
    name: 'installation',
    component: () => import('../views/Installation.vue')
  },
  {
    path: '/theming',
    name: 'theming',
    component: () => import('../views/Theming.vue')
  }
]

// Generate routes for all components from navigation config
Object.values(navigation).forEach(section => {
  section.items.forEach(item => {
    if (!['introduction', 'installation', 'theming'].includes(item.id)) {
      routes.push({
        path: `/components/${item.id}`,
        name: item.id,
        component: () => import('../views/ComponentDocs.vue')
      })
    }
  })
})

// Catch-all route for 404
routes.push({
  path: '/:pathMatch(.*)*',
  redirect: '/introduction'
})

export const router = createRouter({
  history: createWebHistory(),
  routes
})

