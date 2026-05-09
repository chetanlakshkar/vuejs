<script setup lang="ts">
const props = defineProps<{
  title: string
  step?: string
  isComplete?: boolean
  isOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

const internalOpen = ref(props.isOpen ?? true)

watch(() => props.isOpen, v => {
  if (typeof v === 'boolean')
    internalOpen.value = v
})

const toggle = () => {
  internalOpen.value = !internalOpen.value
  emit('update:isOpen', internalOpen.value)
}
</script>

<template>
  <div class="step-section d-flex">
    <div class="step-section__rail">
      <span
        class="step-section__bullet"
        :class="{ 'step-section__bullet--complete': isComplete }"
      >
        <VIcon
          v-if="isComplete"
          icon="tabler-check"
          size="14"
          color="white"
        />
      </span>
      <div class="step-section__line" />
    </div>

    <div class="step-section__body flex-grow-1">
      <button
        type="button"
        class="step-section__header"
        @click="toggle"
      >
        <span class="d-flex align-center ga-3">
          <span class="text-subtitle-1 font-weight-medium">{{ title }}</span>
          <VChip
            v-if="step"
            size="x-small"
            variant="tonal"
            color="default"
            label
          >
            {{ step }}
          </VChip>
        </span>
        <VIcon
          :icon="internalOpen ? 'tabler-chevron-up' : 'tabler-chevron-down'"
          size="22"
          class="text-medium-emphasis"
        />
      </button>

      <div
        v-show="internalOpen"
        class="step-section__content"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-section {
  &__rail {
    display: flex;
    flex-direction: column;
    align-items: center;
    inline-size: 32px;
    flex-shrink: 0;
    padding-block-start: 28px;
  }

  &__bullet {
    inline-size: 18px;
    block-size: 18px;
    border-radius: 50%;
    border: 2px solid rgba(var(--v-theme-primary), 0.6);
    background-color: rgb(var(--v-theme-surface));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &--complete {
      background-color: rgb(var(--v-theme-success));
      border-color: rgb(var(--v-theme-success));
    }
  }

  &__line {
    inline-size: 2px;
    flex-grow: 1;
    background-color: rgba(var(--v-border-color), var(--v-border-opacity));
    margin-block-start: 4px;
  }

  &__body {
    min-inline-size: 0;
  }

  &__header {
    inline-size: 100%;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 10px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  &__content {
    margin-block-start: 1rem;
    margin-inline-start: 0;
  }
}
</style>
