<script setup lang="ts">
import EmptyCampaignsState from '@/views/campaign/EmptyCampaignsState.vue'
import WorkflowModeDialog from '@/views/campaign/WorkflowModeDialog.vue'

definePage({
  name: 'campaign',
  meta: {
    breadcrumbs: [{ title: 'Campaign' }],
  },
})

const router = useRouter()
const isWorkflowDialogOpen = ref(false)
const filter = ref<'all' | 'draft' | 'active' | 'paused'>('all')
const search = ref('')

const filterOptions = [
  { title: 'All', value: 'all' },
  { title: 'Draft', value: 'draft' },
  { title: 'Active', value: 'active' },
  { title: 'Paused', value: 'paused' },
]

const handleNewCampaign = () => {
  isWorkflowDialogOpen.value = true
}

const handleWorkflowSelected = (mode: 'advanced' | 'standard') => {
  isWorkflowDialogOpen.value = false
  if (mode === 'advanced')
    router.push({ name: 'campaign-advanced' })
  else
    router.push({ name: 'campaign-standard' })
}
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <div class="d-flex flex-wrap align-center ga-3">
      <VSelect
        v-model="filter"
        :items="filterOptions"
        density="comfortable"
        variant="outlined"
        hide-details
        class="filter-select"
      />
      <VTextField
        v-model="search"
        placeholder="Search"
        prepend-inner-icon="tabler-search"
        density="comfortable"
        variant="outlined"
        hide-details
        class="filter-search"
      />
      <VSpacer />
    </div>

    <EmptyCampaignsState @new-campaign="handleNewCampaign" />

    <WorkflowModeDialog
      v-model="isWorkflowDialogOpen"
      @select="handleWorkflowSelected"
    />
  </div>
</template>

<style lang="scss" scoped>
.filter-select {
  inline-size: 220px;
  max-inline-size: 100%;
}

.filter-search {
  inline-size: 320px;
  max-inline-size: 100%;
}
</style>
