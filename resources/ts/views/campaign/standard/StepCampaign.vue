<script setup lang="ts">
interface FollowUp {
  id: number
  message: string
  delay: { minutes: number; hour: number; days: number }
}

const props = defineProps<{
  modelValue: {
    connectionMessage: string
    followUps: FollowUp[]
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
  (e: 'previous'): void
  (e: 'save-draft'): void
  (e: 'launch'): void
}>()

const data = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

const addFollowUp = () => {
  const next = data.value.followUps.length
    ? Math.max(...data.value.followUps.map(f => f.id)) + 1
    : 1

  data.value = {
    ...data.value,
    followUps: [
      ...data.value.followUps,
      { id: next, message: 'Hi  {{first_name}}...', delay: { minutes: 3, hour: 3, days: 3 } },
    ],
  }
}

const removeFollowUp = (id: number) => {
  data.value = {
    ...data.value,
    followUps: data.value.followUps.filter(f => f.id !== id),
  }
}

const updateFollowUpDelay = (id: number, key: 'minutes' | 'hour' | 'days', value: number) => {
  data.value = {
    ...data.value,
    followUps: data.value.followUps.map(f =>
      f.id === id ? { ...f, delay: { ...f.delay, [key]: value } } : f,
    ),
  }
}
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <div class="timeline">
      <!-- Campaign Start -->
      <div class="timeline-row">
        <div class="timeline-bullet" />
        <div class="timeline-card timeline-card--soft">
          <div class="timeline-card__head">
            <VIcon
              icon="tabler-rocket"
              size="20"
              color="primary"
            />
            <span class="timeline-card__title">Campaign Start</span>
          </div>
          <div class="timeline-card__hint">
            When a lead enters your target audience
          </div>
        </div>
      </div>

      <!-- Send LinkedIn Connection Request -->
      <div class="timeline-row">
        <div class="timeline-bullet" />
        <div class="timeline-card">
          <div class="timeline-card__head">
            <VIcon
              icon="tabler-brand-linkedin"
              size="20"
              color="primary"
            />
            <span class="timeline-card__title">Send LinkedIn Connection Request</span>
            <VSpacer />
            <IconBtn
              size="small"
              variant="text"
            >
              <VIcon
                icon="tabler-edit"
                size="20"
              />
            </IconBtn>
            <IconBtn
              size="small"
              variant="text"
              color="error"
            >
              <VIcon
                icon="tabler-trash"
                size="20"
              />
            </IconBtn>
          </div>
          <div class="message-box">
            <div class="message-box__preview">
              Hi  &#123;&#123;first_name&#125;&#125;...
            </div>
            <div class="d-flex ga-3">
              <VBtn
                color="primary"
                rounded="lg"
              >
                Edit Message
              </VBtn>
              <VBtn
                variant="outlined"
                color="primary"
                rounded="lg"
                prepend-icon="tabler-sparkles"
              >
                Make with AI
              </VBtn>
            </div>
          </div>
        </div>
      </div>

      <!-- Follow-up messages -->
      <div
        v-for="(followUp) in data.followUps"
        :key="followUp.id"
        class="timeline-row"
      >
        <div class="timeline-bullet" />
        <div class="timeline-card">
          <div class="timeline-card__head">
            <VIcon
              icon="tabler-corner-up-right"
              size="20"
              color="primary"
            />
            <span class="timeline-card__title">Set Follow-up message</span>
            <VSpacer />
            <IconBtn
              size="small"
              variant="text"
            >
              <VIcon
                icon="tabler-edit"
                size="20"
              />
            </IconBtn>
            <IconBtn
              size="small"
              variant="text"
              color="error"
              @click="removeFollowUp(followUp.id)"
            >
              <VIcon
                icon="tabler-trash"
                size="20"
              />
            </IconBtn>
          </div>
          <div class="message-box">
            <div class="message-box__preview">
              Hi  &#123;&#123;first_name&#125;&#125;...
            </div>
            <div class="d-flex ga-3">
              <VBtn
                color="primary"
                rounded="lg"
              >
                Edit Message
              </VBtn>
              <VBtn
                variant="outlined"
                color="primary"
                rounded="lg"
                prepend-icon="tabler-sparkles"
              >
                Make with AI
              </VBtn>
            </div>
          </div>
          <div class="delay-row">
            <span class="delay-row__label">Once accepted wait</span>
            <input
              :value="followUp.delay.minutes"
              type="number"
              min="0"
              class="delay-input"
              @input="(e) => updateFollowUpDelay(followUp.id, 'minutes', +(e.target as HTMLInputElement).value)"
            >
            <span class="delay-row__unit">Minutes</span>
            <input
              :value="followUp.delay.hour"
              type="number"
              min="0"
              class="delay-input"
              @input="(e) => updateFollowUpDelay(followUp.id, 'hour', +(e.target as HTMLInputElement).value)"
            >
            <span class="delay-row__unit">Hour</span>
            <input
              :value="followUp.delay.days"
              type="number"
              min="0"
              class="delay-input"
              @input="(e) => updateFollowUpDelay(followUp.id, 'days', +(e.target as HTMLInputElement).value)"
            >
            <span class="delay-row__unit">days</span>
          </div>
        </div>
      </div>

      <!-- Add new follow-up -->
      <div class="timeline-row">
        <div class="timeline-bullet" />
        <button
          type="button"
          class="timeline-add"
          @click="addFollowUp"
        >
          <VIcon
            icon="tabler-circle-plus"
            size="22"
            color="primary"
          />
          <span>Add new follow-up</span>
        </button>
      </div>

      <!-- End of Campaign -->
      <div class="timeline-row timeline-row--last">
        <div class="timeline-bullet" />
        <div class="timeline-end">
          <VIcon
            icon="tabler-circle-minus"
            size="22"
            color="primary"
          />
          <span>End of Campaign</span>
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
          @click="emit('launch')"
        >
          Launch Campaign
        </VBtn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline {
  position: relative;
  padding-inline-start: 28px;

  &::before {
    content: '';
    position: absolute;
    inset-inline-start: 8px;
    inset-block-start: 12px;
    inset-block-end: 12px;
    inline-size: 1.5px;
    background-color: rgba(var(--v-theme-primary), 0.4);
  }
}

.timeline-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-block: 12px;

  &--last::before {
    /* hide line beneath the last item */
    content: '';
    position: absolute;
    inset-inline-start: -20px;
    inset-block-start: 0;
    inset-block-end: 0;
    inline-size: 12px;
    background-color: rgb(var(--v-theme-background));
  }
}

.timeline-bullet {
  position: absolute;
  inset-inline-start: -28px;
  inset-block-start: 22px;
  inline-size: 14px;
  block-size: 14px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-background));
  border: 1.5px solid rgb(var(--v-theme-primary));
}

.timeline-card {
  flex: 1;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
  background-color: rgb(var(--v-theme-surface));
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  &--soft {
    background-color: rgba(var(--v-theme-primary), 0.04);
    border-color: rgba(var(--v-theme-primary), 0.18);
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
  }

  &__hint {
    font-size: 0.875rem;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }
}

.message-box {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 10px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  &__preview {
    font-size: 0.95rem;
    color: rgb(var(--v-theme-on-surface));
  }
}

.delay-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  border: 1px dashed rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 10px;
  padding: 12px 16px;

  &__label,
  &__unit {
    font-size: 0.9rem;
    color: rgb(var(--v-theme-on-surface));
  }
}

.delay-input {
  inline-size: 44px;
  block-size: 32px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));

  &:focus {
    outline: none;
    border-color: rgb(var(--v-theme-primary));
  }

  /* hide native spinners */
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
}

.timeline-add {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
  background-color: rgba(var(--v-theme-on-surface), 0.02);
  color: rgb(var(--v-theme-on-surface));
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.18s ease;

  &:hover {
    background-color: rgba(var(--v-theme-primary), 0.04);
  }
}

.timeline-end {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: 1px solid rgba(var(--v-theme-primary), 0.18);
  border-radius: 12px;
  background-color: rgba(var(--v-theme-primary), 0.06);
  color: rgb(var(--v-theme-on-surface));
  font-weight: 500;
  font-size: 0.95rem;
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
