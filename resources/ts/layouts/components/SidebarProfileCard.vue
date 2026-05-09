<script setup lang="ts">
import { useLayoutConfigStore } from '@layouts/stores/config'
import { injectionKeyIsVerticalNavHovered } from '@layouts/symbols'

const configStore = useLayoutConfigStore()
const isHovered = inject(injectionKeyIsVerticalNavHovered, ref(false))
const isMini = configStore.isVerticalNavMini(isHovered)

const user = {
  name: 'John Doe',
  role: 'Admin',
  email: 'johndoe@gmail.com',
  avatar: './Active.svg',
}
</script>

<template>
  <div
    class="sidebar-profile-card"
    :class="{ 'sidebar-profile-card--mini': isMini }"
  >
    <div class="d-flex align-center ga-3">
      <VBadge
        dot
        location="bottom right"
        offset-x="3"
        offset-y="3"
        color="success"
        bordered
      >
        <VAvatar
          size="40"
          :image="user.avatar"
        />
      </VBadge>
      <Transition name="fade">
        <div
          v-if="!isMini"
          class="flex-grow-1 min-w-0"
        >
          <div class="text-body-1 font-weight-medium text-truncate">
            {{ user.name }}
          </div>
          <div class="text-caption text-medium-emphasis">
            {{ user.role }}
          </div>
        </div>
      </Transition>
      <IconBtn
        v-if="!isMini"
        size="small"
        variant="text"
        color="default"
      >
        <VIcon
          icon="tabler-logout"
          size="20"
        />
      </IconBtn>
    </div>

    <template v-if="!isMini">
      <VDivider class="my-3" />
      <div class="text-caption text-medium-emphasis">
        Email
      </div>
      <div class="text-body-2 text-truncate">
        {{ user.email }}
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-profile-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 10px;
  padding: 12px 14px;
  background-color: rgb(var(--v-theme-surface));
  transition: padding 0.18s ease;

  &--mini {
    padding: 6px;
    display: inline-flex;
    border-radius: 999px;
  }
}

.min-w-0 {
  min-inline-size: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
