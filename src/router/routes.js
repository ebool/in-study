
const routes = [
  {
    path: '/',
    component: () => import('pages/Index.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/home/')
      },
      {
        path: '/home',
        component: () => import('pages/home/')
      },
      {
        path: '/stats',
        component: () => import('pages/stats/')
      },
      {
        path: '/waiting',
        component: () => import('pages/waiting/')
      },
      {
        path: '/timer',
        component: () => import('pages/timer/')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
