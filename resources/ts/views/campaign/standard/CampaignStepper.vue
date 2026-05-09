<script setup lang="ts">
export type StepKey = 'leads' | 'audience' | 'campaign'

const props = defineProps<{
  active: StepKey
}>()

const steps: { key: StepKey; title: string; icon: string }[] = [
  { key: 'leads', title: 'Leads List', icon: 'tabler-list-check' },
  { key: 'audience', title: 'Target Audience', icon: 'tabler-send' },
  { key: 'campaign', title: 'Campaign', icon: 'tabler-speakerphone' },
]

const stateOf = (key: StepKey) => {
  const order = steps.map(s => s.key)
  const activeIdx = order.indexOf(props.active)
  const idx = order.indexOf(key)

  if (idx === activeIdx)
    return 'active'
  if (idx < activeIdx)
    return 'completed'

  return 'pending'
}
</script>

<template>
  <div class="campaign-stepper">
    <template
      v-for="(step, idx) in steps"
      :key="step.key"
    >
      <div
        class="stepper-item"
        :class="`stepper-item--${stateOf(step.key)}`"
      >
        <div class="stepper-item__icon">
          <VIcon
            :icon="step.icon"
            size="20"
          />
        </div>
        <div class="stepper-item__title">
          {{ step.title }}
        </div>
      </div>
      <VIcon
        v-if="idx < steps.length - 1"
        icon="tabler-chevron-right"
        size="20"
        class="stepper-chevron"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.campaign-stepper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
  background-color: rgb(var(--v-theme-surface));
}

.stepper-item {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-inline-size: 0;
  padding: 4px 6px;

  &__icon {
    inline-size: 38px;
    block-size: 38px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background-color: rgba(var(--v-theme-on-surface), 0.06);
    color: rgba(var(--v-theme-on-surface), 0.55);
    transition: background-color 0.18s ease, color 0.18s ease;
  }

  &__title {
    font-size: 1rem;
    font-weight: 500;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &--active {
    .stepper-item__icon {
      background-color: rgb(var(--v-theme-primary));
      color: white;
    }

    .stepper-item__title {
      color: rgb(var(--v-theme-on-surface));
      font-weight: 600;
    }
  }

  &--completed {
    .stepper-item__icon {
      background-color: rgba(var(--v-theme-primary), 0.12);
      color: rgb(var(--v-theme-primary));
    }

    .stepper-item__title {
      color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    }
  }
}

.stepper-chevron {
  color: rgba(var(--v-theme-on-surface), 0.45);
  flex-shrink: 0;
}
</style>
