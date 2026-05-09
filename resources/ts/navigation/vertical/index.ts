import type { VerticalNavItems } from '@layouts/types'

export default [
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-layout-dashboard' },
    href: '#',
  },
  {
    title: 'Campaign',
    icon: { icon: 'tabler-speakerphone' },
    to: { name: 'campaign' },
  },
  {
    title: 'LinkedIn Search',
    icon: { icon: 'tabler-brand-linkedin' },
    href: '#',
  },
  {
    title: 'Sender Profile',
    icon: { icon: 'tabler-user-circle' },
    href: '#',
  },
  {
    title: 'Prospect lists',
    icon: { icon: 'tabler-users' },
    href: '#',
  },
  {
    title: 'Inbox',
    icon: { icon: 'tabler-inbox' },
    href: '#',
  },
  {
    title: 'Integrations',
    icon: { icon: 'tabler-plug' },
    href: '#',
  },
  {
    title: 'Settings',
    icon: { icon: 'tabler-settings' },
    href: '#',
  },
] as VerticalNavItems
