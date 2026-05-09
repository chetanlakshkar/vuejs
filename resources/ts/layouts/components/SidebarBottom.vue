<script setup lang="ts">
import SidebarProfileCard from './SidebarProfileCard.vue'
import SidebarThemeToggle from './SidebarThemeToggle.vue'
import { useLayoutConfigStore } from '@layouts/stores/config'
import { injectionKeyIsVerticalNavHovered } from '@layouts/symbols'

const configStore = useLayoutConfigStore()
const isHovered = inject(injectionKeyIsVerticalNavHovered, ref(false))
const isMini = configStore.isVerticalNavMini(isHovered)
</script>

<template>
  <div
    class="sidebar-bottom d-flex flex-column ga-3"
    :class="[isMini ? 'sidebar-bottom--mini' : '']"
  >
    <SidebarProfileCard />
    <SidebarThemeToggle />
  </div>
</template>

<style lang="scss" scoped>
.sidebar-bottom {
  margin-block-start: auto;
  padding: 16px;
  transition: padding 0.18s ease;

  &--mini {
    padding: 12px 14px;
    align-items: center;
  }
}
</style>
