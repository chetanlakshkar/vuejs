<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "select", mode: "advanced" | "standard"): void;
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const selected = ref<"advanced" | "standard">("advanced");

const close = () => emit("update:modelValue", false);

const handleNext = () => emit("select", selected.value);

const modes = [
  {
    value: "advanced" as const,
    title: "Advanced Workflow",
    subtitle: "Best for high-volume outreach",
    bullets: ["Conditional logic", "Multiple paths", "More control"],
    recommended: true,
  },
  {
    value: "standard" as const,
    title: "Standard Workflow",
    subtitle: "Best for beginners",
    bullets: ["Linear steps", "No conditions", "Easy Setup"],
    recommended: false,
  },
];
</script>

<template>
  <VDialog v-model="isOpen" max-width="640" scrollable>
    <VCard rounded="lg">
      <div class="d-flex align-start pa-6 pb-4 ga-3">
        <div class="flex-grow-1">
          <div class="text-h5 font-weight-semibold">Select Workflow Mode</div>
          <div class="text-body-2 text-medium-emphasis mt-1">
            Choose how you want your campaign to behave
          </div>
        </div>
        <IconBtn variant="text" @click="close">
          <VIcon icon="tabler-x" size="20" />
        </IconBtn>
      </div>

      <VDivider />

      <VCardText class="pa-6 d-flex flex-column ga-4">
        <div
          v-for="mode in modes"
          :key="mode.value"
          role="radio"
          tabindex="0"
          :aria-checked="selected === mode.value"
          class="mode-card"
          :class="{ 'mode-card--active': selected === mode.value }"
          @click="selected = mode.value"
          @keydown.space.prevent="selected = mode.value"
          @keydown.enter.prevent="selected = mode.value"
        >
          <div class="d-flex align-start ga-3 flex-grow-1">
            <VRadio
              :model-value="selected === mode.value"
              :value="true"
              true-icon="tabler-circle-dot"
              false-icon="tabler-circle"
              hide-details
              density="compact"
              color="primary"
              class="flex-shrink-0 mt-n1"
              readonly
            />
            <div class="flex-grow-1">
              <div class="d-flex align-center ga-3 flex-wrap">
                <span class="text-subtitle-1 font-weight-semibold">{{
                  mode.title
                }}</span>
                <VChip
                  v-if="mode.recommended"
                  size="x-small"
                  color="success"
                  variant="tonal"
                  label
                >
                  Recommended
                </VChip>
              </div>
              <div class="text-body-2 text-medium-emphasis mt-1">
                {{ mode.subtitle }}
              </div>
              <div class="d-flex flex-wrap ga-4 mt-3">
                <div
                  v-for="b in mode.bullets"
                  :key="b"
                  class="d-flex align-center ga-2 text-body-2 text-medium-emphasis"
                >
                  <span class="mode-card__dot" />
                  {{ b }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              v-if="mode.value === 'advanced'"
              src="/Frame1.svg"
              alt="Advanced Workflow"
              class="workflow-image"
            />

            <img
              v-else
              src="/Frame2.svg"
              alt="Standard Workflow"
              class="workflow-image"
            />
          </div>
        </div>
      </VCardText>

      <VDivider />

      <VCardActions class="pa-6">
        <VSpacer />
        <VBtn variant="tonal" color="default" @click="close"> Close </VBtn>
        <VBtn color="primary" @click="handleNext"> Next </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.mode-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  text-align: start;
  padding: 1.25rem;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
  background-color: rgb(var(--v-theme-surface));
  cursor: pointer;
  user-select: none;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    border-color: rgba(var(--v-theme-primary), 0.5);
  }

  &:focus-visible {
    outline: 2px solid rgb(var(--v-theme-primary));
    outline-offset: 2px;
  }

  &--active {
    border-color: rgb(var(--v-theme-primary));
    background-color: rgba(var(--v-theme-primary), 0.04);
  }

  &__dot {
    inline-size: 6px;
    block-size: 6px;
    border-radius: 50%;
    background-color: rgba(var(--v-theme-on-surface), 0.45);
  }

  &__art {
    flex-shrink: 0;
    inline-size: 110px;
    block-size: 78px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(var(--v-theme-primary), 0.05);
    border-radius: 10px;
    padding: 5px;
  }
}

.opacity-60 {
  opacity: 0.6;
}
</style>
