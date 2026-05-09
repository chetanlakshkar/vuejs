<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    linkedinUrl: string
    csvFile: File | null
    useWebhook: boolean
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
  (e: 'previous'): void
  (e: 'continue'): void
  (e: 'save-draft'): void
}>()

const data = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const onPickFile = () => fileInput.value?.click()

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  data.value = { ...data.value, csvFile: target.files?.[0] ?? null }
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  data.value = { ...data.value, csvFile: e.dataTransfer?.files?.[0] ?? null }
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}
</script>

<template>
  <div class="d-flex flex-column ga-8">
    <div class="audience-grid">
      <div class="audience-card audience-card--stretch">
        <div class="audience-card__title">
          Basic LinkedIn Search
        </div>
        <VTextField
          :model-value="data.linkedinUrl"
          placeholder="https://www.linkedin.com/search/results/people/..."
          variant="outlined"
          density="comfortable"
          hide-details
          class="mt-2"
          @update:model-value="v => data = { ...data, linkedinUrl: v }"
        />
        <div class="form-hint mt-3">
          Filter profiles in the
          <a
            href="https://www.linkedin.com/search/results/people/"
            target="_blank"
            rel="noopener"
            class="text-primary text-decoration-underline"
          >LinkedIn search</a>
          and paste the URL above
        </div>
      </div>

      <div class="audience-card">
        <div class="audience-card__title">
          Upload CSV File
        </div>
        <div
          class="csv-dropzone"
          :class="{ 'csv-dropzone--active': isDragging }"
          @click="onPickFile"
          @drop="onDrop"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
        >
          <div class="csv-dropzone__icon">
            <VIcon
              icon="tabler-upload"
              size="22"
            />
          </div>
          <div class="csv-dropzone__label">
            {{ data.csvFile ? data.csvFile.name : 'Drop file here' }}
          </div>
          <input
            ref="fileInput"
            type="file"
            accept=".csv,text/csv"
            hidden
            @change="onFileChange"
          >
        </div>
      </div>

      <div class="audience-card">
        <div class="audience-card__title">
          Advanced options
        </div>
        <VCheckbox
          :model-value="data.useWebhook"
          color="primary"
          label="Use Webhook"
          hide-details
          density="compact"
          class="mt-2"
          @update:model-value="v => data = { ...data, useWebhook: !!v }"
        />
        <div class="form-hint mt-2">
          Use a webhook to send leads automatically.
        </div>
      </div>
    </div>

    <div class="d-flex align-center justify-space-between flex-wrap ga-3">
      <button
        type="button"
        class="back-link"
        @click="emit('previous')"
      >
        Back
      </button>
      <div class="d-flex ga-3">
        <VBtn
          variant="tonal"
          color="default"
          size="large"
          rounded="lg"
          @click="emit('save-draft')"
        >
          Save as Draft
        </VBtn>
        <VBtn
          color="primary"
          size="large"
          rounded="lg"
          @click="emit('continue')"
        >
          Continue
        </VBtn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audience-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 16px;
  align-items: stretch;
}

@media (max-width: 960px) {
  .audience-grid {
    grid-template-columns: 1fr;
  }
}

.audience-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
  padding: 18px 20px;
  background-color: rgb(var(--v-theme-surface));
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 0.95rem;
    font-weight: 500;
    color: rgb(var(--v-theme-on-surface));
  }
}

.form-hint {
  font-size: 0.8125rem;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.csv-dropzone {
  margin-block-start: 12px;
  min-block-size: 92px;
  border: 1.5px dashed rgba(var(--v-theme-primary), 0.5);
  border-radius: 10px;
  background-color: rgba(var(--v-theme-primary), 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease;

  &__icon {
    inline-size: 32px;
    block-size: 32px;
    border-radius: 8px;
    background-color: rgba(var(--v-theme-primary), 0.12);
    color: rgb(var(--v-theme-primary));
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__label {
    font-size: 0.875rem;
    color: rgb(var(--v-theme-primary));
    font-weight: 500;
  }

  &--active,
  &:hover {
    background-color: rgba(var(--v-theme-primary), 0.08);
    border-color: rgb(var(--v-theme-primary));
  }
}

.back-link {
  background: transparent;
  border: 0;
  color: rgb(var(--v-theme-primary));
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 4px;
}
</style>
