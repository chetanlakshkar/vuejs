<script lang="ts" setup>
import navItems from '@/navigation/vertical'

import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
import HeaderUserChip from '@/layouts/components/HeaderUserChip.vue'
import SidebarBottom from '@/layouts/components/SidebarBottom.vue'

import { VerticalNavLayout } from '@layouts'
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <template #navbar>
      <div class="d-flex h-100 align-center w-100 ga-3">
        <AppBreadcrumbs />
        <VSpacer />
        <HeaderUserChip />
      </div>
    </template>

    <template #after-vertical-nav-items>
      <SidebarBottom />
    </template>

    <slot />
  </VerticalNavLayout>
</template>
