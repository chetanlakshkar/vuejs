<script lang="ts" setup>
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'

const { layoutAttrs, injectSkinClasses } = useSkins()

injectSkinClasses()
</script>

<template>
  <Component
    v-bind="layoutAttrs"
    :is="DefaultLayoutWithVerticalNav"
  >
    <RouterView v-slot="{ Component }">
      <Suspense :timeout="0">
        <Component :is="Component" />
      </Suspense>
    </RouterView>
  </Component>
</template>

<style lang="scss">
@use "@layouts/styles/default-layout";
</style>
