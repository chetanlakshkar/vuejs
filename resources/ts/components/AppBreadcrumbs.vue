<script setup lang="ts">
const route = useRoute()

interface Crumb {
  title: string
  to?: string
}

const crumbs = computed<Crumb[]>(() => {
  const meta = route.meta as { breadcrumbs?: Crumb[] }

  if (meta.breadcrumbs?.length)
    return meta.breadcrumbs

  return [{ title: String(route.name ?? 'Home') }]
})
</script>

<template>
  <div class="app-breadcrumbs d-flex align-center ga-2 text-body-1">
    <RouterLink
      to="/"
      class="d-flex align-center text-medium-emphasis"
    >
      <VIcon
        icon="tabler-home-2"
        size="20"
        color="primary"
      />
    </RouterLink>

    <template
      v-for="(crumb, idx) in crumbs"
      :key="idx"
    >
      <VIcon
        icon="tabler-chevron-right"
        size="16"
        class="text-disabled"
      />
      <RouterLink
        v-if="crumb.to && idx < crumbs.length - 1"
        :to="crumb.to"
        class="text-primary text-decoration-none"
      >
        {{ crumb.title }}
      </RouterLink>
      <span
        v-else
        class="text-high-emphasis"
      >
        {{ crumb.title }}
      </span>
    </template>
  </div>
</template>
