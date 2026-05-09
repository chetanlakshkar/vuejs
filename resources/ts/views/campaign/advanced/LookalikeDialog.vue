<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'select', listName: string): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

const lists = ref([
  { name: 'Founder', count: '1000+ Users in the List' },
  { name: 'Tech Profiles', count: '1000+ Users in the List' },
])

const selected = ref<string | null>('Founder')

const close = () => emit('update:modelValue', false)

const confirmSelection = () => {
  if (selected.value) {
    emit('select', selected.value)
    close()
  }
}

const addNew = () => {
  const name = `Custom List ${lists.value.length + 1}`
  lists.value.push({ name, count: '1000+ Users in the List' })
  selected.value = name
}
</script>

<template>
  <VDialog
    v-model="isOpen"
    max-width="640"
  >
    <VCard rounded="lg">
      <div class="d-flex align-start pa-6 pb-4 ga-3">
        <div class="flex-grow-1">
          <div class="text-h5 font-weight-semibold">
            Lookalikes
          </div>
          <div class="text-body-2 text-medium-emphasis mt-1">
            Select a lookalike list for this campaign
          </div>
        </div>
        <IconBtn
          variant="text"
          @click="close"
        >
          <VIcon
            icon="tabler-x"
            size="20"
          />
        </IconBtn>
      </div>

      <VDivider />

      <VCardText class="pa-6">
        <template v-if="lists.length === 0">
          <div class="d-flex flex-column align-center text-center pa-12 ga-3">
            <div class="text-h6 font-weight-semibold">
              You don't have any leads
            </div>
            <div class="text-body-2 text-medium-emphasis">
              Create a lead list to start running campaigns
            </div>
            <VBtn
              color="primary"
              size="large"
              class="mt-3"
              @click="addNew"
            >
              Create a List
            </VBtn>
          </div>
        </template>

        <template v-else>
          <div class="d-flex flex-column ga-3">
            <button
              v-for="l in lists"
              :key="l.name"
              type="button"
              class="lookalike-row"
              :class="{ 'lookalike-row--active': selected === l.name }"
              @click="selected = l.name"
            >
              <VIcon
                icon="tabler-list"
                size="18"
                class="text-medium-emphasis flex-shrink-0"
              />
              <span class="flex-grow-1 text-start">
                <span class="text-subtitle-2 font-weight-semibold">{{ l.name }}</span>
                <span class="text-body-2 text-medium-emphasis ms-2">({{ l.count }})</span>
              </span>
              <VIcon
                v-if="selected === l.name"
                icon="tabler-check"
                color="primary"
                size="18"
              />
            </button>
          </div>
          <div class="text-end mt-4">
            <a
              href="#"
              class="text-primary text-body-2 text-decoration-none"
              @click.prevent="addNew"
            >Add New</a>
          </div>
        </template>
      </VCardText>

      <template v-if="lists.length > 0">
        <VDivider />
        <VCardActions class="pa-6">
          <VSpacer />
          <VBtn
            variant="tonal"
            color="default"
            @click="close"
          >
            Cancel
          </VBtn>
          <VBtn
            color="primary"
            :disabled="!selected"
            @click="confirmSelection"
          >
            Select List
          </VBtn>
        </VCardActions>
      </template>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.lookalike-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 10px;
  background-color: rgb(var(--v-theme-surface));
  cursor: pointer;
  transition: border-color 0.18s ease, background-color 0.18s ease;

  &:hover:not(.lookalike-row--active) {
    border-color: rgba(var(--v-theme-primary), 0.4);
  }

  &--active {
    background-color: rgba(var(--v-theme-primary), 0.06);
    border-color: rgba(var(--v-theme-primary), 0.5);
  }
}
</style>
