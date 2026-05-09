<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    name: string
    type: string
    channel: 'email' | 'linkedin' | 'both' | null
    schedule: string
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
  (e: 'continue'): void
}>()

const data = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

const channelOptions = [
  { value: 'email', label: 'Email Only' },
  { value: 'linkedin', label: 'LinkedIn Only' },
  { value: 'both', label: 'LinkedIn + Email' },
] as const

const typeOptions = [
  { title: 'LinkedIn Invitation', value: 'linkedin-invitation' },
  { title: 'LinkedIn Message', value: 'linkedin-message' },
  { title: 'Email Outreach', value: 'email-outreach' },
  { title: 'Multichannel', value: 'multichannel' },
]

const setChannel = (v: 'email' | 'linkedin' | 'both') => {
  data.value = { ...data.value, channel: v }
}
</script>

<template>
  <div class="d-flex flex-column ga-8">
    <div class="form-grid">
      <div class="form-field">
        <label class="form-label">Campaign Name</label>
        <VTextField
          :model-value="data.name"
          placeholder="e.g. Founder Outreach – India"
          variant="outlined"
          density="comfortable"
          hide-details
          @update:model-value="v => data = { ...data, name: v }"
        />
        <div class="form-hint">
          Give your workflow a clear name so you can find it later.
        </div>
      </div>

      <div class="form-field">
        <label class="form-label">Campaign Type</label>
        <VSelect
          :model-value="data.type"
          :items="typeOptions"
          variant="outlined"
          density="comfortable"
          hide-details
          menu-icon="tabler-chevron-down"
          @update:model-value="v => data = { ...data, type: v }"
        />
        <div class="form-hint">
          Choose how this workflow will start.
        </div>
      </div>

      <div class="form-field">
        <label class="form-label">Outreach Channel</label>
        <div class="channel-group">
          <button
            v-for="opt in channelOptions"
            :key="opt.value"
            type="button"
            class="channel-btn"
            :class="{ 'channel-btn--active': data.channel === opt.value }"
            @click="setChannel(opt.value)"
          >
            {{ opt.label }}
          </button>
        </div>
        <div class="form-hint">
          Select how you want to reach your leads in this workflow.
        </div>
      </div>

      <div class="form-field">
        <label class="form-label">Sending Schedule</label>
        <div class="d-flex align-center ga-3 flex-wrap">
          <VTextField
            :model-value="data.schedule"
            placeholder="Mon - Fri 9:00 AM - 5 : 00 PM"
            variant="outlined"
            density="comfortable"
            hide-details
            class="schedule-input"
            @update:model-value="v => data = { ...data, schedule: v }"
          >
            <template #append-inner>
              <VIcon
                icon="tabler-clock"
                size="20"
                class="text-medium-emphasis"
              />
            </template>
          </VTextField>
          <button
            type="button"
            class="add-time-btn"
          >
            + Add new time
          </button>
        </div>
        <div class="form-hint">
          Messages are sent only within your selected hours.
        </div>
      </div>
    </div>

    <div class="d-flex justify-end">
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
</template>

<style lang="scss" scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px 40px;
}

@media (max-width: 960px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
}

.form-hint {
  font-size: 0.8125rem;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.channel-group {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.channel-btn {
  height: 44px;
  padding: 0 16px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  background-color: rgb(var(--v-theme-surface));
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    border-color: rgba(var(--v-theme-primary), 0.5);
    color: rgb(var(--v-theme-on-surface));
  }

  &--active {
    border-color: rgb(var(--v-theme-primary));
    background-color: rgba(var(--v-theme-primary), 0.08);
    color: rgb(var(--v-theme-primary));
    font-weight: 500;
  }
}

.schedule-input {
  flex: 1;
  min-inline-size: 220px;
}

.add-time-btn {
  height: 44px;
  padding: 0 16px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  background-color: rgb(var(--v-theme-surface));
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 0.9rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    border-color: rgba(var(--v-theme-primary), 0.5);
    color: rgb(var(--v-theme-primary));
  }
}
</style>
