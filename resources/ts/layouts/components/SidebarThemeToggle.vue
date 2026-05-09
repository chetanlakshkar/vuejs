<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useLayoutConfigStore } from '@layouts/stores/config'
import { injectionKeyIsVerticalNavHovered } from '@layouts/symbols'

const theme = useTheme()
const configStore = useLayoutConfigStore()
const isHovered = inject(injectionKeyIsVerticalNavHovered, ref(false))
const isMini = configStore.isVerticalNavMini(isHovered)

const current = computed(() => theme.global.name.value === 'dark' ? 'dark' : 'light')

const setTheme = (mode: 'light' | 'dark') => {
  theme.global.name.value = mode
}

const toggleTheme = () => {
  setTheme(current.value === 'dark' ? 'light' : 'dark')
}
</script>

<template>
  <button
    v-if="isMini"
    type="button"
    class="theme-toggle-mini"
    @click="toggleTheme"
  >
    <VIcon
      :icon="current === 'dark' ? 'tabler-moon' : 'tabler-sun'"
      size="20"
      color="primary"
    />
  </button>

  <div
    v-else
    class="theme-toggle d-flex align-center pa-1"
  >
    <button
      type="button"
      class="theme-toggle__btn"
      :class="{ 'theme-toggle__btn--active': current === 'light' }"
      @click="setTheme('light')"
    >
      <VIcon
        icon="tabler-sun"
        size="18"
      />
      <span>Light</span>
    </button>
    <button
      type="button"
      class="theme-toggle__btn"
      :class="{ 'theme-toggle__btn--active': current === 'dark' }"
      @click="setTheme('dark')"
    >
      <VIcon
        icon="tabler-moon"
        size="18"
      />
      <span>Dark</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.theme-toggle {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 999px;
  background-color: rgb(var(--v-theme-surface));
}

.theme-toggle__btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 0;
  background: transparent;
  border-radius: 999px;
  block-size: 36px;
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;

  &:hover {
    color: rgb(var(--v-theme-on-surface));
  }

  &--active {
    background-color: rgba(var(--v-theme-primary), 0.08);
    color: rgb(var(--v-theme-primary));
  }
}

.theme-toggle-mini {
  inline-size: 40px;
  block-size: 40px;
  border-radius: 999px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: rgb(var(--v-theme-surface));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.18s ease;

  &:hover {
    background-color: rgba(var(--v-theme-primary), 0.06);
  }
}
</style>
