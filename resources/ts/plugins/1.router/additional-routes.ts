import type { RouteRecordRaw } from 'vue-router/auto'

export const redirects: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: () => ({ name: 'campaign' }),
  },
]

export const routes: RouteRecordRaw[] = []
