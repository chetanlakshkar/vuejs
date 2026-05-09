import type { RouteNamedMap, _RouterTyped } from 'unplugin-vue-router'

export const setupGuards = (_router: _RouterTyped<RouteNamedMap & { [key: string]: any }>) => {
  // No auth guards in this project (yet).
}
