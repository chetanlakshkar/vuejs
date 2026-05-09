<script setup lang="ts">
import StepSection from './StepSection.vue'
import ImportMethodCards, { type ImportMethod } from './ImportMethodCards.vue'
import LinkedInUrlPanel from './LinkedInUrlPanel.vue'
import CsvUploadPanel from './CsvUploadPanel.vue'
import MapPropertiesPanel from './MapPropertiesPanel.vue'
import LookalikeDialog from './LookalikeDialog.vue'

const emit = defineEmits<{
  (e: 'next'): void
}>()

const importMethod = ref<ImportMethod | null>(null)
const csvUploaded = ref(false)
const lookalikeDialogOpen = ref(false)
const selectedList = ref<string | null>(null)
const showEmptyLookalikes = ref(true)

const onImportMethodChange = (m: ImportMethod) => {
  importMethod.value = m
  csvUploaded.value = false

  if (m === 'lookalike') {
    showEmptyLookalikes.value = !selectedList.value
    lookalikeDialogOpen.value = true
  }
}

const onCsvSelected = (_file: File) => {
  csvUploaded.value = true
}

const onLookalikeSelected = (name: string) => {
  selectedList.value = name
  showEmptyLookalikes.value = false
}

const removeMap = () => {
  csvUploaded.value = false
}

const showStepTwo = computed(() => importMethod.value !== null && importMethod.value !== 'lookalike')

const stepTwoTitle = computed(() => {
  if (csvUploaded.value)
    return 'Upload CSV file Selected'
  if (importMethod.value === 'linkedin')
    return 'Paste LinkedIn Search URL'
  if (importMethod.value === 'csv')
    return 'Upload CSV File'
  if (importMethod.value === 'webhook')
    return 'Configure Webhook'

  return 'Continue'
})

const isStepTwoComplete = computed(() => csvUploaded.value)
const isStepOneComplete = computed(() => importMethod.value !== null)

const canProceed = computed(() => {
  if (importMethod.value === null)
    return false
  if (importMethod.value === 'lookalike')
    return selectedList.value !== null

  return true
})
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <div class="d-flex flex-column ga-2">
      <StepSection
        title="Choose Import Method"
        :step="csvUploaded ? 'Step 1 of 2' : undefined"
        :is-complete="isStepOneComplete"
        :is-open="true"
      >
        <ImportMethodCards
          v-model="importMethod"
          @update:model-value="onImportMethodChange"
        />
      </StepSection>

      <template v-if="showStepTwo">
        <StepSection
          v-if="importMethod === 'csv' && csvUploaded"
          title="Upload CSV File"
          step="Step 1 of 2"
          :is-complete="true"
          :is-open="true"
        >
          <MapPropertiesPanel @remove="removeMap" />
        </StepSection>

        <StepSection
          v-else
          :title="stepTwoTitle"
          :step="csvUploaded ? 'Step 1 of 2' : (importMethod === 'csv' ? 'Step 1 of 2' : undefined)"
          :is-complete="isStepTwoComplete"
          :is-open="true"
        >
          <LinkedInUrlPanel v-if="importMethod === 'linkedin'" />
          <CsvUploadPanel
            v-else-if="importMethod === 'csv'"
            @file-selected="onCsvSelected"
          />
          <div
            v-else-if="importMethod === 'webhook'"
            class="text-body-2 text-medium-emphasis pa-6 text-center"
          >
            Webhook configuration UI placeholder.
          </div>
        </StepSection>
      </template>

      <div
        v-if="importMethod === 'lookalike' && selectedList"
        class="ms-8"
      >
        <VAlert
          color="primary"
          variant="tonal"
          icon="tabler-list-check"
        >
          Selected list: <strong>{{ selectedList }}</strong>
          <template #append>
            <a
              href="#"
              class="text-primary text-body-2 text-decoration-none"
              @click.prevent="lookalikeDialogOpen = true"
            >Change</a>
          </template>
        </VAlert>
      </div>
    </div>

    <div class="d-flex justify-end">
      <VBtn
        color="primary"
        size="large"
        :disabled="!canProceed"
        @click="emit('next')"
      >
        Next
      </VBtn>
    </div>

    <LookalikeDialog
      v-model="lookalikeDialogOpen"
      @select="onLookalikeSelected"
    />
  </div>
</template>
