import type { RouteLocationNormalized } from 'vue-router'
import type { NavGroup } from '@layouts/types'

// CASL is not used in this project — these helpers always allow.

export const can = (_action?: string, _subject?: string) => true

export const canViewNavMenuGroup = (item: NavGroup) => item.children.length > 0

export const canNavigate = (_to: RouteLocationNormalized) => true
