import React from 'react'

interface Routers {
  path: string,
  component: Function
}
const routes: Routers[] = [
  {
    path: '/about',
    component: React.lazy(() => import('../Views/HelloWord'))
  },
  {
    path: '/advertise',
    component: React.lazy(() => import('../Views/Advertise'))
  }
]
export type {
  Routers
}
export {
  routes
}
