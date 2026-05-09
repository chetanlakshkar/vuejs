<script setup lang="ts">
type StepKey = 'audience' | 'sender'

const props = defineProps<{
  modelValue: StepKey
  audienceComplete: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: StepKey): void
}>()

const select = (k: StepKey) => {
  if (k === 'sender' && !props.audienceComplete)
    return
  emit('update:modelValue', k)
}

const steps: { key: StepKey; label: string; icon: string }[] = [
  { key: 'audience', label: 'Define Target Audience', icon: 'tabler-list-check' },
  { key: 'sender', label: 'Sender Profiles', icon: 'tabler-user-circle' },
]
</script>

<template>
  <VCard
    class="pa-3 d-flex align-center ga-2"
    rounded="lg"
    elevation="0"
  >
    <template
      v-for="(step, idx) in steps"
      :key="step.key"
    >
      <button
        type="button"
        class="step-pill flex-grow-1"
        :class="{
          'step-pill--active': modelValue === step.key,
          'step-pill--disabled': step.key === 'sender' && !audienceComplete,
        }"
        @click="select(step.key)"
      >
        <span
          class="step-pill__icon"
          :class="{ 'step-pill__icon--active': modelValue === step.key }"
        >
          <VIcon
            :icon="step.icon"
            size="22"
          />
        </span>
        <span class="step-pill__label">{{ step.label }}</span>
      </button>
      <VIcon
        v-if="idx < steps.length - 1"
        icon="tabler-chevron-right"
        class="text-disabled"
        size="22"
      />
    </template>
  </VCard>
</template>

<style lang="scss" scoped>
.step-pill {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 0;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  text-align: start;
  color: rgb(var(--v-theme-on-surface));
  transition: background-color 0.18s ease;

  &:hover:not(.step-pill--disabled):not(.step-pill--active) {
    background-color: rgba(var(--v-theme-primary), 0.04);
  }

  &--active {
    cursor: default;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__icon {
    inline-size: 36px;
    block-size: 36px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(var(--v-theme-on-surface), 0.05);
    color: rgba(var(--v-theme-on-surface), 0.55);

    &--active {
      background-color: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
    }
  }

  &__label {
    font-size: 1rem;
    font-weight: 500;
  }
}
</style>
