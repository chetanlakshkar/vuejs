<script setup lang="ts">
export type ImportMethod = 'linkedin' | 'csv' | 'lookalike' | 'webhook'

const props = defineProps<{ modelValue: ImportMethod | null }>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: ImportMethod): void
}>()

const methods: {
  value: ImportMethod
  title: string
  icon: string
  description: string
  htmlDesc?: string
}[] = [
  {
    value: 'linkedin',
    title: 'LinkedIn\nSearch',
    icon: 'tabler-brand-linkedin',
    description: '(Basic, Sales Nav, Post, Group or Event URL)',
  },
  {
    value: 'csv',
    title: 'Upload\nCSV File',
    icon: 'tabler-calendar',
    description: 'Upload LinkedIn profiles via CSV.',
    htmlDesc: 'Upload LinkedIn profiles via CSV. <a href="#" class="text-primary text-decoration-none">Download Sample</a>',
  },
  {
    value: 'lookalike',
    title: 'Lookalike\nAudience',
    icon: 'tabler-users-group',
    description: 'Use Lead Finder to find audience.',
  },
  {
    value: 'webhook',
    title: 'Inbound\nWebhook',
    icon: 'tabler-brand-linkedin',
    description: 'Sync leads from zapier, n8n make in real time',
  },
]

const select = (v: ImportMethod) => emit('update:modelValue', v)
</script>

<template>
  <div class="import-cards-grid">
    <button
      v-for="m in methods"
      :key="m.value"
      type="button"
      class="import-card"
      :class="{ 'import-card--active': props.modelValue === m.value }"
      @click="select(m.value)"
    >
      <span
        v-if="props.modelValue === m.value"
        class="import-card__check"
      >
        <VIcon
          icon="tabler-check"
          size="14"
          color="white"
        />
      </span>
      <span class="import-card__icon">
        <VIcon
          :icon="m.icon"
          size="24"
          color="primary"
        />
      </span>
      <div class="import-card__title">
        <template
          v-for="(line, idx) in m.title.split('\n')"
          :key="idx"
        >
          {{ line }}<br>
        </template>
      </div>
      <div
        class="import-card__desc"
        v-html="m.htmlDesc ?? m.description"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.import-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.import-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 10px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: rgba(var(--v-theme-primary), 0.03);
  cursor: pointer;
  text-align: start;
  transition: border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;

  &:hover:not(.import-card--active) {
    border-color: rgba(var(--v-theme-primary), 0.5);
  }

  &--active {
    border-color: rgb(var(--v-theme-primary));
    background-color: rgba(var(--v-theme-primary), 0.06);
    box-shadow: 0 0 0 1px rgb(var(--v-theme-primary)) inset;
  }

  &__check {
    position: absolute;
    inset-block-start: 12px;
    inset-inline-end: 12px;
    inline-size: 22px;
    block-size: 22px;
    border-radius: 6px;
    background-color: rgb(var(--v-theme-primary));
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    inline-size: 32px;
    block-size: 32px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
    line-height: 1.25;
  }

  &__desc {
    font-size: 0.8125rem;
    color: rgba(var(--v-theme-on-surface), 0.65);
    line-height: 1.35;
  }
}
</style>
