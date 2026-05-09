<script setup lang="ts">
const emit = defineEmits<{
  (e: 'remove'): void
}>()

interface FieldRow {
  contactField: string
  csvColumn: string
  count: number
  matched: boolean
}

const rows = ref<FieldRow[]>([
  { contactField: 'Full name', csvColumn: 'Full name', count: 35, matched: true },
  { contactField: 'First name', csvColumn: 'First name', count: 3, matched: true },
  { contactField: 'Last name', csvColumn: 'Last name', count: 12, matched: true },
  { contactField: 'Company Name', csvColumn: 'Company Name', count: 36, matched: true },
  { contactField: 'Position', csvColumn: 'Position', count: 25, matched: true },
  { contactField: 'Headline', csvColumn: 'Headline', count: 25, matched: true },
])

const unmapped = ref([
  { name: 'Location', count: 9, parenCount: 3 },
  { name: 'Industry', count: 3, parenCount: 3 },
  { name: 'Notes', count: 9, parenCount: 9 },
])

const search = ref('')
</script>

<template>
  <VCard
    rounded="lg"
    elevation="0"
    border
    class="pa-6 position-relative"
  >
    <button
      type="button"
      class="map-remove-btn"
      @click="emit('remove')"
    >
      <VIcon
        icon="tabler-trash"
        color="error"
        size="22"
      />
    </button>

    <div class="text-h6 font-weight-semibold">
      Map Properties
    </div>
    <div class="d-flex align-center ga-2 text-body-2 text-medium-emphasis mt-2">
      <VIcon
        icon="tabler-check"
        color="primary"
        size="16"
      />
      Make sure file includes contact name and phone number
    </div>

    <VDivider class="my-5" />

    <VRow>
      <VCol
        cols="12"
        md="8"
      >
        <div class="d-flex">
          <div class="map-col">
            <div class="map-col__head">
              Contact Field
            </div>
            <div class="d-flex flex-column ga-3">
              <div
                v-for="row in rows"
                :key="row.contactField"
                class="map-cell map-cell--field"
              >
                <VIcon
                  icon="tabler-list"
                  size="18"
                  color="success"
                />
                <span>{{ row.contactField }}</span>
              </div>
            </div>
          </div>
          <div class="map-col">
            <div class="map-col__head">
              CSV Column
            </div>
            <div class="d-flex flex-column ga-3">
              <div
                v-for="row in rows"
                :key="row.csvColumn"
                class="map-cell"
              >
                <VIcon
                  :icon="row.contactField === 'Position' ? 'tabler-grip-vertical' : (row.contactField === 'Headline' ? 'tabler-notes' : 'tabler-user-circle')"
                  size="18"
                  class="text-medium-emphasis"
                />
                <span class="flex-grow-1">{{ row.csvColumn }}</span>
                <span class="text-caption text-medium-emphasis">({{ row.count }})</span>
              </div>
            </div>
          </div>
        </div>
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <VCard
          class="pa-4"
          rounded="lg"
          elevation="0"
          border
        >
          <div class="text-subtitle-2 font-weight-semibold mb-3">
            Unmapped Works
          </div>
          <VTextField
            v-model="search"
            placeholder="Search"
            prepend-inner-icon="tabler-search"
            density="compact"
            variant="outlined"
            hide-details
            class="mb-3"
          />
          <div class="d-flex flex-column ga-2">
            <div
              v-for="u in unmapped"
              :key="u.name"
              class="unmapped-row"
            >
              <VIcon
                icon="tabler-list"
                size="16"
                class="text-primary"
              />
              <span class="flex-grow-1">{{ u.name }} ({{ u.count }})</span>
              <span class="text-caption text-medium-emphasis">({{ u.parenCount }})</span>
            </div>
          </div>
          <div class="text-end mt-4">
            <a
              href="#"
              class="text-primary text-caption text-decoration-none"
            >Clear All Matched</a>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.map-remove-btn {
  position: absolute;
  inset-block-start: 16px;
  inset-inline-end: 16px;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;

  &:hover {
    background-color: rgba(var(--v-theme-error), 0.08);
  }
}

.map-col {
  flex: 1;

  &__head {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), 0.6);
    font-weight: 600;
    letter-spacing: 0.5px;
    padding-block-end: 12px;
  }
}

.map-cell {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.875rem;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  background-color: rgb(var(--v-theme-surface));
  font-size: 0.9375rem;
  margin-inline-end: 12px;
}

.unmapped-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  background-color: rgba(var(--v-theme-primary), 0.03);
  font-size: 0.875rem;
}
</style>
